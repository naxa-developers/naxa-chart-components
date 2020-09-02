import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./combinedchart.css";

function CombinedChart({ data }) {
  const combinedchart = useRef(null);
  let svg = null;
  let tooltip = null;
  function plot(chart, width, height) {
    // create scales!
    const xScale = d3
      .scaleBand()
      .domain(data.map((d) => d.label))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([
        0,
        d3.max(data, (d) =>
          d.barValue > d.lineValue ? d.barValue : d.lineValue
        ),
      ])
      .range([height, 0]);
    const yGridlines = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat("");
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "barchart-tooltip")
      .style("opacity", 0);
    const valueLine = d3
      .line()
      .curve(d3.curveMonotoneX)
      .x((d) => xScale(d.label) + 20)
      .y((d) => yScale(d.lineValue));
    chart.append("g").call(yGridlines).classed("guideline", true);
    chart
      .selectAll(".bar")
      .data(data)
      .enter()
      .append("rect")
      .classed("bar", true)
      .attr("x", (d) => xScale(d.label) + 10 / 2)
      .attr("y", (d) => yScale(d.barValue))
      .attr("height", (d) => height - yScale(d.barValue))
      .attr("width", (d) => xScale.bandwidth() - 10)
      .style("fill", "#ffb100")
      .on("mouseover", (d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
      })
      .on("mousemove", (d) => {
        tooltip
          .html(`<b> ${d.label} </b> <br/> ${d.barValue}`)
          .style("left", `${d3.event.pageX}px`)
          .style("top", `${d3.event.pageY}px`);
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    chart
      .append("path")
      .attr("d", valueLine(data))
      .attr("stroke", "#40b449")
      .attr("stroke-width", 1.5)
      .attr("fill", "none");
    chart
      .selectAll(".dots")
      .data(data)
      .enter()
      .append("circle")
      .classed("bar", true)
      .attr("cx", (d) => xScale(d.label) + 20)
      .attr("cy", (d) => yScale(d.lineValue))
      .attr("r", (d) => 4)
      .style("stroke", "#40b449")
      .style("fill", "#40b449")
      .style("stroke-width", 2)
      .on("mouseover", (d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
      })
      .on("mousemove", (d) => {
        tooltip
          .html(`<b> ${d.label} </b> <br/> ${d.lineValue}`)
          .style("left", `${d3.event.pageX}px`)
          .style("top", `${d3.event.pageY}px`);
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(200).style("opacity", 0);
      });

    const xAxis = d3.axisBottom().tickSize(0).scale(xScale);

    chart
      .append("g")
      .classed("x axis", true)
      .attr("transform", `translate(0,${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft().ticks(5).tickSize(0).scale(yScale);

    chart
      .append("g")
      .classed("y axis", true)
      .attr("transform", "translate(0,0)")
      .call(yAxis);

    chart
      .select(".x.axis")
      .append("text")
      .attr("x", width / 2)
      .attr("y", 40)
      .attr("fill", "#000")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Label");

    chart
      .select(".y.axis")
      .append("text")
      .attr("x", 0)
      .attr("y", 0)
      .attr("transform", `translate(-30, ${height / 2}) rotate(-90)`)
      .attr("fill", "#000")
      .style("font-size", "14px")
      .style("text-anchor", "middle")
      .text("Value");

    const legend = chart
      .append("g")
      .classed("legend", true)
      .attr("transform", "translate(" + 0 + "," + (height + 60) + ")");
    legend
      .append("circle")
      .attr("r", 5)
      .attr("cx", width / 4)
      .attr("stroke", "#40b449")
      .attr("fill", "#40b449")
      .attr("stroke-width", 2);
    legend
      .append("text")
      .attr("x", width / 4 + 8)
      .attr("y", 5)
      .text("Line Data");
    legend
      .append("rect")
      .attr("height", 10)
      .attr("width", 10)
      .attr("x", width / 2)
      .attr("y", -5)
      .attr("stroke", "#ffb100")
      .attr("fill", "#ffb100")
      .attr("stroke-width", 2);
    legend
      .append("text")
      .attr("x", width / 2 + 12)
      .attr("y", 5)
      .text("Bar Data");
  }

  function drawChart() {
    svg = d3.select(combinedchart.current).append("svg").attr("id", "chart");
    const margin = {
      top: 30,
      bottom: 80,
      left: 50,
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
    d3.select(combinedchart.current).selectAll("svg").remove();
    d3.select("body").selectAll(".barchart-tooltip").remove();
    svg = null;
  }

  useEffect(() => {
    destroyChart();
    drawChart();
  }, [data]);

  return (
    <div
      ref={combinedchart}
      id="chartwrapper"
      style={{ height: "400px", width: "500px" }}
    />
  );
}

export default CombinedChart;
