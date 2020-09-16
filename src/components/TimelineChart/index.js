import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './Timelinechart.css';

function TimeLineChart({ TimelineChartData }) {
  const timelinechart = useRef(null);
  let svg = null;
  let tooltip = null;
  function plot(chart, width, height) {
    const parseTime = d3.timeParse('%d/%m/%Y');
    const xFormat = '%d %b';
    const xScale = d3
      .scaleTime()
      .domain(
        d3.extent(TimelineChartData, (d, i) => {
          if (i === 0) {
            return parseTime(d.startdate);
          } else {
            return parseTime(d.enddate);
          }
        })
      )
      .rangeRound([0, width]);
    const yScale = d3
      .scaleBand()
      .domain(TimelineChartData.map((d) => d.name))
      .range([height, 0]);
    tooltip = d3.select('body').append('div').attr('class', 'timelinechart-tooltip').style('opacity', 0);
  


    const xAxis = d3
      .axisBottom()
      .tickSize(0)
      .ticks(TimelineChartData.length)
      .tickFormat(d3.timeFormat(xFormat))
      .scale(xScale);

    chart.append('g').style('x axis', true).attr('transform', `translate(0,${height})`).call(xAxis);

    const yAxis = d3.axisLeft().ticks(0).tickSize(0).scale(yScale);

    chart.append('g').classed('y axis', true).attr('transform', 'translate(0,0)').call(yAxis);
    chart
      .selectAll('.rect')
      .data(TimelineChartData)
      .enter()
      .append('rect')
      .attr('x', (d) => xScale(parseTime(d.startdate)))
      .attr('y', (d) => yScale(d.name)+10)
      .attr('height', 15)
      .attr('width', (d) => xScale(parseTime(d.enddate)) - xScale(parseTime(d.startdate)))
      .on("mouseover", (d) => {
        tooltip.transition().duration(200).style("opacity", 0.9);
      })
      .on("mousemove", (d) => {
        tooltip
          .html(`<b> ${d.name} </b> <br/>${d.startdate} <br/> ${d.enddate}`)
          .style("left", `${d3.event.pageX}px`)
          .style("top", `${d3.event.pageY}px`);
      })
      .on("mouseout", (d) => {
        tooltip.transition().duration(200).style("opacity", 0);
      });
  }

  function drawChart() {
    svg = d3.select(timelinechart.current).append('svg').attr('id', 'chart');
    const margin = {
      top: 50,
      bottom: 50,
      left: 30,
      right: 20,
    };

    const chart = svg.append('g').classed('display', true).attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth = parseInt(d3.select('#chart').style('width'), 10) - margin.left - margin.right;
    const chartHeight = parseInt(d3.select('#chart').style('height'), 10) - margin.top - margin.bottom;
    plot(chart, chartWidth, chartHeight);
  }

  function destroyChart() {
    d3.select(timelinechart.current).selectAll('svg').remove();
    d3.select('body').selectAll('.timelinechart-tooltip').remove();
    svg = null;
  }

  useEffect(() => {
    destroyChart();
    drawChart();
  }, [TimelineChartData]);

  return <div ref={timelinechart} id="chartwrapper" style={{ height: '320px', width: '500px' }} />;
}

export default TimeLineChart;
