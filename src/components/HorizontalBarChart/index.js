import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './horizontalbar.css';

const HorizontalBarChart = ({
  data,
  width,
  height,
  margin = { top: 20, right: 20, bottom: 30, left: 40 },
  colors = ['#008080'],
  padding = 0.1,
  onClick,
}) => {
  const svgRef = useRef();

  function plotChart() {
    // set the dimensions and margins of the graph
    const svgWidth = width - margin.left - margin.right;
    const svgHeight = height - margin.top - margin.bottom;

    // set the ranges
    const y = d3.scaleBand().range([svgHeight, 0]).padding(padding);

    const x = d3.scaleLinear().range([0, svgWidth]);

    const tooltip = d3.select('body').append('div').attr('class', 'tooltip');

    // append the svg object to the body of the page
    // append a 'group' element to 'svg'
    // moves the 'Jroup' element to the top left margin
    const svg = d3
      .select(svgRef.current)
      .attr('width', svgWidth + margin.left + margin.right)
      .attr('height', svgHeight + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    // format the data
    data.forEach(function (d) {
      d.value = +d.value;
    });

    // Scale the range of the data in the domains
    x.domain([
      0,
      d3.max(data, function (d) {
        return d.value;
      }),
    ]);
    y.domain(
      data.map(function (d) {
        return d.label;
      })
    );
    //y.domain([0, d3.max(data, function(d) { return d.sales; })]);

    // append the rectangles for the bar chart
    const bar = svg.selectAll('.bar').data(data).enter();

    bar
      .append('rect')
      .attr('class', 'bar')
      .style('fill', colors[0])
      //.attr("x", function(d) { return x(d.sales); })
      .attr('width', function (d) {
        return x(d.value);
      })
      .attr('y', function (d) {
        return y(d.label);
      })
      .attr('height', y.bandwidth())
      .on('mousemove', function (d) {
        tooltip
          .style('left', d3.event.pageX - 50 + 'px')
          .style('top', d3.event.pageY - 70 + 'px')
          .style('display', 'inline-block')
          .html(d.label + '<br>' + d.value);
        // .append('span')
        // .style('height', '5px')
        // .style('width', '5px')
        // .style('background', 'red');
      })
      .on('mouseout', function (d) {
        tooltip.style('display', 'none');
      })
      .on('click', d => onClick && onClick(d));

    // bar
    //   .append('text')
    //   .attr('fill', 'white')
    //   .attr('x', d => x(d.value) - 3)
    //   .attr('y', y.bandwidth() / 2)
    //   .attr('dy', '0.35em')
    //   .text(d => d.value);

    // tooltip.append('div').attr('class', 'tooltip-marker');

    // add the x Axis
    svg
      .append('g')
      .attr('transform', 'translate(0,' + svgHeight + ')')
      .call(d3.axisBottom(x));

    // add the y Axis
    svg.append('g').call(d3.axisLeft(y));
  }

  function destroyChart() {
    d3.select(svgRef.current).selectAll('g').remove();
    d3.select(svgRef.current).selectAll('.tooltip').remove();
  }

  useEffect(() => {
    destroyChart();
    plotChart();
    // }, [data]);
  });

  return <svg ref={svgRef}></svg>;
};

export default HorizontalBarChart;
