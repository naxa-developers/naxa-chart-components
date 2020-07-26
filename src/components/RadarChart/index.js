import React, { useRef, useEffect } from "react";
import * as d3 from "d3";
import "./radarchart.css";

function RadarChart({ data, categories }) {
  const radarchart = useRef(null);
  let svg = null;
  let tooltip = null;
  function plot(chart, width, height) {
    const radius = Math.min(width / 2, height / 2);
    const allAxis = data[0].map((item) => item.axis);
    const total = allAxis.length;
    const circleLevels = 4;
    const radians = 2 * Math.PI;
    const maxValue = Math.max(
      0,
      d3.max(data, (d) => d3.max(d.map((d) => d.value)))
    );
    const color = d3.scaleOrdinal().range(["#0076FF", "#40B449", "#FF0F0F"]);
    tooltip = d3
      .select("body")
      .append("div")
      .attr("class", "radarchart-tooltip")
      .style("opacity", 0);
    for (var j = 0; j < circleLevels; j++) {
      const levelFactor = radius * ((j + 1) / circleLevels);
      chart
        .selectAll(".levels")
        .data(allAxis)
        .enter()
        .append("svg:line")
        .attr("x1", function (d, i) {
          return levelFactor * (1 - Math.sin((i * radians) / total));
        })
        .attr("y1", function (d, i) {
          return levelFactor * (1 - Math.cos((i * radians) / total));
        })
        .attr("x2", function (d, i) {
          return levelFactor * (1 - Math.sin(((i + 1) * radians) / total));
        })
        .attr("y2", function (d, i) {
          return levelFactor * (1 - Math.cos(((i + 1) * radians) / total));
        })
        .attr("class", "line")
        .style("stroke", "grey")
        .style("stroke-opacity", "0.75")
        .style("stroke-width", "0.3px")
        .attr(
          "transform",
          "translate(" +
            (width / 2 - levelFactor) +
            ", " +
            (height / 2 - levelFactor) +
            ")"
        );
    }
    for (var j = 0; j < circleLevels; j++) {
      const levelFactor = radius * ((j + 1) / circleLevels);
      chart
        .selectAll(".levels")
        .data([1])
        .enter()
        .append("text")
        .attr("x", function (d) {
          return levelFactor * (1 - 2.85 * Math.sin(0));
        })
        .attr("y", function (d) {
          return levelFactor * (1 - Math.cos(0));
        })
        .attr("class", "legend")
        .style("font-family", "sans-serif")
        .style("font-size", "10px")
        .attr(
          "transform",
          "translate(" +
            (width / 2 - levelFactor + 5) +
            ", " +
            (height / 2 - levelFactor) +
            ")"
        )
        .attr("fill", "#737373")
        .text(Math.round((((j + 1) * maxValue) / circleLevels) * 100) / 100);
    }
    chart
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("line")
      .attr("class", "axis")
      .attr("x1", width / 2)
      .attr("y1", height / 2)
      .attr("x2", function (d, i) {
        return (width / 2) * (1 - Math.sin((i * radians) / total));
      })
      .attr("y2", function (d, i) {
        return (height / 2) * (1 - Math.cos((i * radians) / total));
      })
      .attr("class", "line")
      .style("stroke", "grey")
      .style("stroke-width", "1px");

    chart
      .selectAll(".axis")
      .data(allAxis)
      .enter()
      .append("text")
      .attr("class", "legend")
      .text(function (d) {
        return d;
      })
      .style("font-family", "sans-serif")
      .style("font-size", "11px")
      .attr("text-anchor", "middle")
      .attr("dy", "1.5em")
      .attr("transform", function (d, i) {
        return "translate(0, -10)";
      })
      .attr("x", function (d, i) {
        return (
          (width / 2) * (1 - 0.85 * Math.sin((i * radians) / total)) -
          60 * Math.sin((i * radians) / total)
        );
      })
      .attr("y", function (d, i) {
        return (
          (height / 2) * (1 - Math.cos((i * radians) / total)) -
          20 * Math.cos((i * radians) / total)
        );
      });

    let series = 0;
    data.forEach(function (dataItem) {
      let dataValues = [];
      chart.selectAll(".nodes").data(dataItem, function (j, i) {
        dataValues.push([
          (width / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0)) / maxValue) *
                Math.sin((i * radians) / total)),
          (height / 2) *
            (1 -
              (parseFloat(Math.max(j.value, 0)) / maxValue) *
                Math.cos((i * radians) / total)),
        ]);
      });
      dataValues.push(dataValues[0]);
      chart
        .selectAll(".area")
        .data([dataValues])
        .enter()
        .append("polygon")
        .attr("class", "radar-chart-serie" + series)
        .style("stroke-width", 1)
        .style("stroke", color(series))
        .attr("points", function (d) {
          var str = "";
          for (var pti = 0; pti < d.length; pti++) {
            str = str + d[pti][0] + "," + d[pti][1] + " ";
          }
          return str;
        })
        .style("fill", color(series))
        .style("fill-opacity", 0.2)
        .on("mouseover", function (d) {
          d3.select(this).style("fill-opacity", 0.7);
        })
        .on("mouseout", function (d) {
          d3.select(this).style("fill-opacity", 0.2);
        });
      series++;
    });
    series = 0;

    data.forEach(function (dataItem) {
      let dataValues = [];
      chart
        .selectAll(".nodes")
        .data(dataItem)
        .enter()
        .append("circle")
        .attr("class", "radar-chart-series" + series)
        .attr("r", 4)
        .attr("alt", function (j) {
          return Math.max(j.value, 0);
        })
        .attr("cx", function (j, i) {
          dataValues.push([
            (width / 2) *
              (1 -
                (parseFloat(Math.max(j.value, 0)) / maxValue) *
                  Math.sin((i * radians) / total)),
            (height / 2) *
              (1 -
                (parseFloat(Math.max(j.value, 0)) / maxValue) *
                  Math.cos((i * radians) / total)),
          ]);
          return (
            (width / 2) *
            (1 -
              (Math.max(j.value, 0) / maxValue) *
                Math.sin((i * radians) / total))
          );
        })
        .attr("cy", function (j, i) {
          return (
            (height / 2) *
            (1 -
              (Math.max(j.value, 0) / maxValue) *
                Math.cos((i * radians) / total))
          );
        })
        .attr("data-id", function (j) {
          return j.axis;
        })
        .style("stroke", color(series))
        .style("stroke-width", 1)
        .style("fill", color(series))
        .style("fill-opacity", 0)
        .on("mouseover", function (d) {
          d3.select(this).style("fill-opacity", 1);
          tooltip.transition().duration(200).style("opacity", 0.8);
        })
        .on("mousemove", (d, i) => {
          tooltip
            .html(`<b>${d.axis}</b><br>${d.value}`)
            .style("left", `${d3.event.pageX}px`)
            .style("top", `${d3.event.pageY}px`);
        })
        .on("mouseout", function (d) {
          d3.select(this).style("fill", "none");
          tooltip.transition().duration(200).style("opacity", 0);
        });
      series++;
    });
    const legend = chart
      .selectAll(".legendEntries")
      .data(categories)
      .enter()
      .append("g");
    legend
      .append("circle")
      .attr("r", 5)
      .attr("cx", (_, i) => i * (width / 2))
      .attr("cy", height + 45)
      .attr("stroke", (_, i) => color(i))
      .attr("stroke-width", 2)
      .attr("fill", "none");
    legend
      .append("text")
      .attr("x", (_, i) => 7 + i * (width / 2))
      .attr("y", height + 45 + 2.7)
      .attr("text-anchor", "left")
      .attr("fill", "#000")
      .style("font-size", "14px")
      .text((d) => d);
  }

  function drawChart() {
    svg = d3.select(radarchart.current).append("svg").attr("id", "chart");
    const margin = {
      top: 30,
      bottom: 60,
      left: 60,
      right: 60,
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
    d3.select(radarchart.current).selectAll("svg").remove();
    d3.select("body").selectAll(".barchart-tooltip").remove();
    svg = null;
  }

  useEffect(() => {
    destroyChart();
    drawChart();
  }, [data]);

  return (
    <div
      ref={radarchart}
      id="chartwrapper"
      style={{ height: "430px", width: "460px" }}
    />
  );
}

export default RadarChart;
