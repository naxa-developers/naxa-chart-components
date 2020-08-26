import React, { Component, createRef } from "react";
import * as d3 from "d3";
import "./DonughtChart.scss";

class DoughnutChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.doughnutRef = createRef();
  }
  componentDidMount() {
    this.drawDonught();
  }
  componentDidUpdate(prevProps) {
    const { DataJs, colorRange } = this.props;
    if (prevProps.DataJs !== DataJs || prevProps.colorRange !== colorRange) {
      this.destroyDonught();
      this.drawDonught();
    }
  }
  destroyDonught = () => {
    d3.select(this.doughnutRef.current).selectAll("svg").remove();
    d3.select(this.doughnutRef.current).select("svg").selectAll("g").remove();
  };
  drawDonught = () => {
    const { DataJs, colorRange } = this.props;
    let width = 450,
      height = 450,
      margin = 2;
    let radius = Math.min(width, height) / 2 - margin;

    let objData = {};
    let arrayVal = [];
    let totalData = 0;
    DataJs.map((data) => {
      if (data.value !== 0) {
        Object.assign(objData, { [data.name]: data.value });
        arrayVal.push(data.name);
        totalData = totalData + data.value;
        return true;
      }
    });

    let svg = d3
      .select(this.doughnutRef.current)
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

    let color = d3
      .scaleOrdinal()
      .range(colorRange ? colorRange : d3.schemePaired);

    let pie = d3
      .pie()
      .sort(null)
      .value(function (d) {
        return d.value;
      });
    let data_ready = pie(d3.entries(objData));
    let arc = d3
      .arc()
      .innerRadius(radius * 0.5)
      .outerRadius(radius * 0.8);
    let outerArc = d3
      .arc()
      .innerRadius(radius * 0.481)
      .outerRadius(radius * 0.819);

    var tooltip = d3.select("#donught-tooltip");
    tooltip.append("div").attr("class", "name");
    tooltip.append("div").attr("class", "value");
    tooltip.append("div").attr("class", "percentage");
    svg
      .selectAll("allSlices")
      .data(data_ready)
      .enter()
      .append("path")
      .attr("d", arc)
      .attr("fill", function (d) {
        return color(d.data.key);
      })
      .attr("stroke", "white")
      .style("stroke-width", "1px")
      .style("stroke-opacity", "0.9")
      .on("mouseover", function (d) {
        let percentData = ((d.data.value / totalData) * 100).toFixed(2) + "%";
        d3.select(this).transition().duration("100").attr("d", outerArc);
        tooltip
          .style("display", "block")
          .style("top", d3.event.pageY + "px")
          .style("left", d3.event.pageX + "px");
        tooltip.select(".name").html(d.data.key);
        tooltip.select(".value").html("Value :" + d.data.value);
        tooltip.select(".percentage").html("In % :" + percentData);
      })
      .on("mouseout", function () {
        d3.select(this).transition().duration("100").attr("d", arc);
        tooltip.style("display", "none");
      });

    let legendSize = 13,
      legendSpacing = 7;
    let legend = svg
      .selectAll(".legend")
      .data(color.domain())
      .enter()
      .append("g")
      .attr("class", "circle-legend")
      .attr("transform", function (d, i) {
        var legendH = color.domain().length * (legendSize + legendSpacing); //total height of legends
        var legendY = i * (legendSize + legendSpacing) - legendH / 2 + 5; //
        var legendX = -legendSize - 30;
        return "translate(" + legendX + "," + legendY + ")";
      });
    legend
      .append("circle")
      .style("fill", color)
      .style("stroke", color)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", ".5rem");
    legend
      .append("text")
      .attr("x", legendSize + legendSpacing)
      .attr("y", legendSize - legendSpacing)
      .text(function (d) {
        return d;
      })
      .style("fill", "white");
  };
  render() {
    const { title, DataJs } = this.props;
    return (
      <div className="main-wrapper-container">
        <div className="donught-title">{title}</div>
        <div id="d3-doughnutchart" ref={this.doughnutRef} />
        <div id="donught-tooltip" />
      </div>
    );
  }
}
export default DoughnutChart;
