import React, { useRef, useEffect } from "react";
import PropTypes from "prop-types";
import * as d3 from "d3";
import "./ganttChart.scss";
import { add, addDays, isAfter, isBefore, sub, subDays } from "date-fns";

const GanttChartD3 = ({ data, title }) => {
  const ganttChartContainer = useRef();
  const parseDate = d3.timeParse("%Y-%m-%d");
  const formatTime = d3.timeFormat("%b %d, %Y");
  useEffect(() => {
    if (data.length) {
      destroyDonught();
      createGanttChart(ganttChartContainer.current, data);
    }
  }, [data]);
  const parseUserData = ({
    id,
    label,
    startDate,
    endDate,
    duration,
    dependsOn,
    color,
  }) => {
    // Data must contain either startDate and duration, or endDate and duration or startDate and endDate
    if (startDate) startDate = parseDate(startDate);
    if (endDate) endDate = parseDate(endDate);
    if (startDate && !endDate && duration) {
      endDate = add(startDate, { [duration[1]]: duration[0] });
    }
    if (!startDate && endDate && duration) {
      startDate = sub(endDate, { [duration[1]]: duration[0] });
    }
    if (!dependsOn) dependsOn = [];
    return {
      id,
      label,
      startDate,
      endDate,
      duration,
      dependsOn,
      color,
    };
  };
  const findDateBoundaries = (data) => {
    let minStartDate, maxEndDate;
    data.map(({ startDate, endDate }) => {
      if (!minStartDate || isBefore(startDate, minStartDate)) {
        minStartDate = startDate;
      }
      if (!minStartDate || isBefore(endDate, minStartDate)) {
        minStartDate = endDate;
      }
      if (!maxEndDate || isAfter(startDate, maxEndDate)) {
        maxEndDate = startDate;
      }
      if (!maxEndDate || isAfter(endDate, maxEndDate)) {
        maxEndDate = endDate;
      }
      return true;
    });
    return {
      minStartDate,
      maxEndDate,
    };
  };
  const sortData = (data) =>
    data.sort((e1, e2) => {
      if (isBefore(e1.endDate, e2.endDate)) return -1;
      else return 1;
    });
  const createDataCacheById = (data) => {
    const value = data.reduce(
      (cache, elt) => ({ ...cache, [elt.id]: elt }),
      {}
    );
    return value;
  };

  const createPolylineData = (rectangleData, elementHeight) => {
    const cachedData = createDataCacheById(rectangleData);
    const storedConnections = rectangleData.reduce(
      (acc, e) => ({ ...acc, [e.id]: 0 }),
      {}
    );
    return rectangleData.flatMap((d) =>
      d.dependsOn
        .map((parentId) => cachedData[parentId])
        .map((parent) => {
          const color =
            "#" +
            (
              (Math.max(0.1, Math.min(0.9, Math.random())) * 0xfff) <<
              0
            ).toString(16);
          storedConnections[parent.id]++;
          storedConnections[d.id]++;
          const deltaParentConnections =
            storedConnections[parent.id] * (elementHeight / 4);
          const deltaChildConnections =
            storedConnections[d.id] * (elementHeight / 4);
          const points = [
            d.x,
            d.y + elementHeight / 2,
            d.x - deltaChildConnections,
            d.y + elementHeight / 2,
            d.x - deltaChildConnections,
            d.y - elementHeight * 0.25,
            parent.xEnd + deltaParentConnections,
            d.y - elementHeight * 0.25,
            parent.xEnd + deltaParentConnections,
            parent.y + elementHeight / 2,
            parent.xEnd,
            parent.y + elementHeight / 2,
          ];
          return {
            points: points.join(","),
            color,
          };
        })
    );
  };
  const createElementData = (data, elementHeight, xScale) =>
    data.map((d, i) => {
      const fontSize = 11;
      const x = xScale(d.startDate);
      const xEnd = xScale(d.endDate);
      const y = i * elementHeight * 1.5;
      const width = xEnd - x;
      const height = elementHeight;
      const color = d.color;
      const charWidth = width / fontSize;
      const dependsOn = d.dependsOn;
      const id = d.id;
      const tooltip = d.label;
      const singleCharWidth = fontSize * 0.5;
      const singleCharHeight = fontSize * 0.45;
      let label = d.label;
      const labelX = x + (width / 2 - (label.length / 2) * singleCharWidth);
      const labelY = y + (height / 2 + singleCharHeight);
      return {
        x,
        y,
        xEnd,
        width,
        height,
        id,
        dependsOn,
        label,
        labelX,
        labelY,
        tooltip,
        color,
      };
    });
  const createChartSVG = (
    container,
    data,
    {
      svgWidth,
      svgHeight,
      scaleWidth,
      elementHeight,
      minStartDate,
      maxEndDate,
      margin,
    }
  ) => {
    const svg = d3
      .select(container)
      .append("svg")
      .attr("width", svgWidth)
      .attr("height", svgHeight);
    const xScale = d3
      .scaleTime()
      .domain([minStartDate, maxEndDate])
      .range([0, scaleWidth]);
    const rectangleData = createElementData(data, elementHeight, xScale);
    const xAxis = d3.axisBottom(xScale);
    const g1 = svg
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);
    const polylineData = createPolylineData(rectangleData, elementHeight);
    const linesContainer = g1
      .append("g")
      .attr("transform", `translate(0,${margin.top})`);
    linesContainer
      .selectAll("polyline")
      .data(polylineData)
      .enter()
      .append("polyline")
      .style("fill", "none")
      .style("stroke", (d) => d.color)
      .attr("points", (d) => d.points);
    const barsContainer = g1
      .append("g")
      .attr("transform", `translate(0,${margin.top})`);
    g1.append("g").call(xAxis);
    const bars = barsContainer
      .selectAll("g")
      .data(rectangleData)
      .enter()
      .append("g");
    const tooltip = d3.select("#ganttChart-tooltip");
    tooltip.append("div").attr("class", "name");
    tooltip.append("div").attr("class", "startDate");
    tooltip.append("div").attr("class", "endDate");
    bars
      .append("rect")
      .attr("x", (d) => d.x)
      .attr("y", (d) => d.y)
      .attr("width", (d) => d.width)
      .attr("height", (d) => d.height)
      .style("fill", (d) => d.color)
      .style("stroke", "white");
    bars
      .append("text")
      .style("fill", "white")
      .style("font-family", "sans-serif")
      .attr("x", (d) => d.labelX)
      .attr("y", (d) => d.labelY)
      .text((d) => d.label);
    bars
      .on("mouseover", function (d) {
        const start = formatTime(parseDate(d.startDate));
        const end = formatTime(parseDate(d.endDate));
        tooltip
          .style("display", "block")
          .style("top", d3.event.pageY + "px")
          .style("left", d3.event.pageX + "px");
        tooltip.select(".name").html(d.label);
        tooltip.select(".startDate").html("Start Date :" + start);
        tooltip.select(".endDate").html("End Date :" + end);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });
  };

  const createGanttChart = (container, data) => {
    const elementHeight = 25;
    const margin = {
      top: elementHeight * 2,
      left: elementHeight * 2,
    };
    const containerWidth = container.getBoundingClientRect().width;
    const containerHeight = container.getBoundingClientRect().height;
    const scaleWidth = containerWidth - margin.left * 2;
    const scaleHeight =
      Math.max(containerHeight, data.length * elementHeight * 2) -
      margin.top * 2;
    const svgWidth = scaleWidth + margin.left * 2;
    const svgHeight = scaleHeight + margin.top * 2;
    data = data.map((item) => parseUserData(item));
    data = sortData(data);
    let { minStartDate, maxEndDate } = findDateBoundaries(data);
    minStartDate = subDays(minStartDate, 2);
    maxEndDate = addDays(maxEndDate, 2);
    createChartSVG(container, data, {
      svgWidth,
      svgHeight,
      scaleWidth,
      elementHeight,
      scaleHeight,
      minStartDate,
      maxEndDate,
      margin,
    });
  };

  const destroyDonught = () => {
    d3.select(ganttChartContainer.current).selectAll("svg").remove();
  };

  return (
    <div className="ganttchart-wrapper">
      <div className="title">
        <u>{title}</u>
      </div>
      <div ref={ganttChartContainer} style={{ height: 400 }} />
      <div id="ganttChart-tooltip" />
    </div>
  );
};

GanttChartD3.propTypes = {
  data: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired,
};

export default GanttChartD3;
