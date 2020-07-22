import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./linechart.css";

function LineChart({ lineChartData }) {
  const linechart = useRef(null);
  let svg = null;
  let tooltip = null;
  function plot(chart, width, height) {
    const parseTime = d3.timeParse("%d/%m/%Y");
    const xFormat = "%d %b";
    const xScale = d3
      .scaleTime()
      .domain(d3.extent(lineChartData, (d) => parseTime(d.date)))
      .rangeRound([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(lineChartData, (d) =>
          d3.max([d.open, d.approved, d.flagged, d.rejected])
        ),
      ])
      .rangeRound([height, 0]);
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "linechart-tooltip")
      .style("opacity", 0);
    const yGridlines = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat("");
    chart.append("g").call(yGridlines).classed("guideline", true);

    const xAxis = d3
      .axisBottom()
      .tickSize(0)
      .ticks(lineChartData.length)
      .tickFormat(d3.timeFormat(xFormat))
      .scale(xScale);

    chart
      .append("g")
      .style("x axis", true)
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft().ticks(5).tickSize(0).scale(yScale);

    chart
      .append("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .call(yAxis);
    const categoryColors = [
      { category: "open", color: "#0076FF" },
      { category: "approved", color: "#40B449" },
      { category: "flagged", color: "#FFB100" },
      { category: "rejected", color: "#FF0F0F" },
    ];
    const defs = chart.append("defs");
    const gradient = defs
      .selectAll(".gradients")
      .data(categoryColors)
      .enter()
      .append("linearGradient")
      .attr("id", (d) => `${d.category}Gradient`)
      .attr("x1", "0%")
      .attr("x2", "0%")
      .attr("y1", "0%")
      .attr("y2", "100%");
    gradient
      .append("stop")
      .attr("class", "start")
      .attr("offset", "0%")
      .attr("stop-color", (d) => d.color)
      .attr("stop-opacity", 0.2);
    gradient
      .append("stop")
      .attr("class", "end")
      .attr("offset", "90%")
      .attr("stop-color", "white")
      .attr("stop-opacity", 0);
    categoryColors.forEach((item) => {
      const valueLine = d3
        .line()
        .curve(d3.curveCardinal)
        .x((d) => xScale(parseTime(d.date)))
        .y((d) => yScale(d[item.category]));
      chart
        .append("path")
        .attr("d", valueLine(lineChartData))
        .attr("stroke", item.color)
        .attr("stroke-width", 1.5)
        .attr("fill", `url(#${item.category}Gradient)`);
    });
    categoryColors.forEach((item) => {
      const catValues = lineChartData.map((i) => i[item.category]);
      const catDates = lineChartData.map((i) => i.date);
      chart
        .selectAll(".dots")
        .data(catValues)
        .enter()
        .append("circle")
        .attr("r", 3)
        .attr("cx", (_, i) => xScale(parseTime(catDates[i])))
        .attr("cy", (d) => yScale(d))
        .attr("stroke", item.color)
        .attr("stroke-width", 1.5)
        .attr("fill", "#fff")
        .on("mouseover", (d) => {
          tooltip.transition().duration(200).style("opacity", 0.9);
        })
        .on("mousemove", (d, i) => {
          tooltip
            .html(`<b> ${catDates[i]} </b> <br/> ${d}`)
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        })
        .on("mouseout", (d) => {
          tooltip.transition().duration(200).style("opacity", 0);
        });
    });
    const legend = chart
      .selectAll(".legendEntries")
      .data(categoryColors)
      .enter()
      .append("g");
    legend
      .append("circle")
      .attr("r", 5)
      .attr("cx", (_, i) => i * (width / 4))
      .attr("cy", height + 35)
      .attr("stroke", (d) => d.color)
      .attr("stroke-width", 2)
      .attr("fill", "none");
    legend
      .append("text")
      .attr("x", (_, i) => 2 + 5 + i * (width / 4))
      .attr("y", height + 35 + 2.5)
      .attr("text-anchor", "left")
      .attr("fill", "#000")
      .style("font-size", "10px")
      .text((d) => d.category);
  }

  function drawChart() {
    svg = d3.select(linechart.current).append("svg").attr("id", "chart");
    const margin = {
      top: 30,
      bottom: 50,
      left: 30,
      right: 20,
    };

    const chart = svg
      .append("g")
      .classed("display", true)
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const chartWidth =
      parseInt(d3.select("#chart").style("width"), 10) -
      margin.left -
      margin.right;
    const chartHeight =
      parseInt(d3.select("#chart").style("height"), 10) -
      margin.top -
      margin.bottom;
    plot(chart, chartWidth, chartHeight);
  }

  function destroyChart() {
    d3.select(linechart.current).selectAll("svg").remove();
    d3.select("body").selectAll(".linechart-tooltip").remove();
    svg = null;
  }

  useEffect(() => {
    destroyChart();
    drawChart();
  }, [lineChartData]);

  return (
    <div
      ref={linechart}
      id="chartwrapper"
      style={{ height: "320px", width: "500px" }}
    />
  );
}

export default LineChart;
