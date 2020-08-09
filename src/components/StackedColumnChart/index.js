import React, { Component } from "react";
import * as d3 from "d3";
import "./stackedColumnChart.scss";

class StackedColumnChart extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.wrapperRef = React.createRef();
    this.stackedColumnRef = React.createRef();
    this.tooltipRef = React.createRef();
  }
  componentDidMount() {
    this.plotStackedChart();
  }
  componentDidUpdate(prevProps) {
    const {
      datas,
      widthValue,
      heightValue,
      mainField,
      colorRange,
    } = this.props;
    if (
      prevProps.datas !== datas ||
      prevProps.widthValue !== widthValue ||
      prevProps.heightValue !== heightValue ||
      prevProps.mainField !== mainField ||
      prevProps.colorRange !== colorRange
    ) {
      this.destroyStackedChart();
      this.plotStackedChart();
    }
  }
  destroyStackedChart = () => {
    d3.select(this.stackedColumnRef.current).selectAll("svg").remove();
    d3.select(this.stackedColumnRef.current)
      .select("svg")
      .selectAll("g")
      .remove();
  };
  plotStackedChart = () => {
    const {
      widthValue,
      heightValue,
      datas,
      mainField,
      colorRange,
    } = this.props;

    const { width, height } = this.wrapperRef.current.getBoundingClientRect();
    const defaultMargin = { top: 20, right: 160, bottom: 35, left: 60 };
    const defaultColorRange = d3.schemeAccent;
    const margin = defaultMargin;

    let widthContainer, heightContainer;
    if (widthValue && widthValue < width) {
      widthContainer = widthValue - margin.left - margin.right;
    } else {
      widthContainer = width - margin.left - margin.right;
    }
    if (heightValue && heightValue < height) {
      heightContainer = heightValue - margin.top - margin.bottom;
    } else {
      heightContainer = height - margin.top - margin.bottom;
    }

    let svg = d3
      .select(this.stackedColumnRef.current)
      .append("svg")
      .attr("width", widthContainer + margin.left + margin.right)
      .attr("height", heightContainer + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    let arrayData = [];
    datas.map((object) => {
      Object.entries(object).map((values) => {
        let valIndex = arrayData.findIndex((label) => label === values[0]);
        if (valIndex === -1) {
          arrayData.push(values[0]);
        }
        return true;
      });
      return true;
    });

    let data = datas
      .slice()
      .sort((a, b) => d3.ascending(a[mainField], b[mainField]));

    let indexedData = arrayData.findIndex((label) => label === mainField);
    arrayData.splice(indexedData, 1);

    svg.append("g").attr("class", "x-axis");
    svg.append("g").attr("class", "y-axis");

    const stackedData = d3.stack().keys(arrayData);
    const layers = stackedData(data);

    let extent = [
      0,
      d3.max(layers, (layer) => d3.max(layer, (sequence) => sequence[1])),
    ];

    var tooltip = d3.select(this.tooltipRef.current);
    tooltip.append("div").attr("class", "name");
    tooltip.append("div").attr("class", "value");

    let xScale = d3
      .scaleBand()
      .domain(data.map((d) => d[mainField]))
      .range([0, widthContainer])
      .padding(0.25);

    let yScale = d3.scaleLinear().domain(extent).range([heightContainer, 0]);

    let colors = d3
      .scaleOrdinal()
      .range(colorRange ? colorRange : defaultColorRange);

    svg
      .selectAll(".layer")
      .data(layers)
      .join("g")
      .attr("class", "layer")
      .attr("fill", (layer) => {
        return colors(layer.key);
      })
      .selectAll("rect")
      .data((layer) => layer)
      .join("rect")
      .attr("x", (sequence, i) => {
        return xScale(sequence.data[mainField]);
      })
      .attr("width", xScale.bandwidth())
      .attr("y", (sequence) => {
        return yScale(sequence[1]);
      })
      .attr("height", (sequence) => {
        return yScale(sequence[0]) - yScale(sequence[1]);
      })
      .on("mouseover", function (d) {
        tooltip
          .style("display", "block")
          .style("top", d3.event.pageY + "px")
          .style("left", d3.event.pageX + "px");
        tooltip.select(".value").html(d[1] - d[0]);
      })
      .on("mouseout", function () {
        tooltip.style("display", "none");
      });

    let xAxis = d3.axisBottom(xScale);
    svg
      .select(".x-axis")
      .attr("transform", "translate(0," + heightContainer + ")")
      .call(xAxis);
    let yAxis = d3.axisLeft(yScale);
    svg.select(".y-axis").call(yAxis);

    let legendSize = 13,
      legendSpacing = 7;
    let legend = svg
      .selectAll(".legend")
      .data(colors.domain())
      .enter()
      .append("g")
      .attr("class", "circle-legend")
      .attr("transform", function (d, i) {
        var legendH = colors.domain().length * (legendSize + legendSpacing); //total height of legends
        var legendY =
          margin.top +
          margin.bottom +
          i * (legendSize + legendSpacing) -
          legendH / 2; //
        var legendX = widthContainer;
        return "translate(" + legendX + "," + legendY + ")";
      });
    legend
      .append("circle")
      .style("fill", colors)
      .style("stroke", colors)
      .attr("cx", 0)
      .attr("cy", 0)
      .attr("r", ".5rem");
    legend
      .append("text")
      .attr("x", legendSize + legendSpacing)
      .attr("y", legendSize - legendSpacing)
      .text(function (d) {
        return d;
      });
  };
  render() {
    const { update } = this.props;
    return (
      <div className="chart-wrapper" ref={this.wrapperRef} key={update}>
        <div ref={this.stackedColumnRef} />
        <div id="tooltip" ref={this.tooltipRef} />
      </div>
    );
  }
}
export default StackedColumnChart;
