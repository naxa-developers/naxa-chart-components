import React, { useRef, useEffect } from 'react';
import * as d3 from 'd3';
import './barchart.css';

function BarChart({ data, duration }) {
  const barchart = useRef(null);
  let svg = null;
  let tooltip = null;
  function plot(chart, width, height) {
    // create scales!
    const xScale = d3
      .scaleBand()
      .domain(data.map(d => d.label))
      .range([0, width]);
    const yScale = d3
      .scaleLinear()
      .domain([0, d3.max(data, d => d.value)])
      .range([height, 0]);
    const yGridlines = d3
      .axisLeft()
      .scale(yScale)
      .ticks(5)
      .tickSize(-width, 0, 0)
      .tickFormat('');
    tooltip = d3
      .select('body')
      .append('div')
      .attr('class', 'barchart-tooltip')
      .style('opacity', 0);
    chart.append('g').call(yGridlines).classed('guideline', true);
    chart
      .selectAll('.bar')
      .data(data)
      .enter()
      .append('rect')
      .classed('bar', true)
      .attr('x', d => xScale(d.label) + 10 / 2)
      .attr('y', d => yScale(d.value))
      .attr('height', d => height - yScale(d.value))
      .attr('width', d => xScale.bandwidth() - 10)
      .style('fill', '#40B449')
      .on('mouseover', d => {
        tooltip.transition().duration(200).style('opacity', 0.9);
      })
      .on('mousemove', d => {
        tooltip
          .html(`<b> ${d.label} </b> <br/> ${d.value}`)
          .style('left', `${d3.event.pageX}px`)
          .style('top', `${d3.event.pageY}px`);
      })
      .on('mouseout', d => {
        tooltip.transition().duration(200).style('opacity', 0);
      });

    const xAxis = d3.axisBottom().tickSize(0).scale(xScale);

    chart
      .append('g')
      .classed('x axis', true)
      .attr('transform', `translate(0,${height})`)
      .call(xAxis);

    const yAxis = d3.axisLeft().ticks(5).tickSize(0).scale(yScale);

    chart
      .append('g')
      .classed('y axis', true)
      .attr('transform', 'translate(0,0)')
      .call(yAxis);

    chart
      .select('.x.axis')
      .append('text')
      .attr('x', width / 2)
      .attr('y', 40)
      .attr('fill', '#000')
      .style('font-size', '14px')
      .style('text-anchor', 'middle')
      .text('Percentage Complete');

    chart
      .select('.y.axis')
      .append('text')
      .attr('x', 0)
      .attr('y', 0)
      .attr('transform', `translate(-30, ${height / 2}) rotate(-90)`)
      .attr('fill', '#000')
      .style('font-size', '14px')
      .style('text-anchor', 'middle')
      .text('Number of Complete');
  }

  function drawChart() {
    svg = d3.select(barchart.current).append('svg').attr('id', 'chart');
    const margin = {
      top: 30,
      bottom: 50,
      left: 50,
      right: 20,
    };

    const chart = svg
      .append('g')
      .classed('display', true)
      .attr('transform', `translate(${margin.left},${margin.top})`);

    const chartWidth =
      parseInt(d3.select('#chart').style('width'), 10) -
      margin.left -
      margin.right;
    const chartHeight =
      parseInt(d3.select('#chart').style('height'), 10) -
      margin.top -
      margin.bottom;
    plot(chart, chartWidth, chartHeight);
  }

  function destroyChart() {
    d3.select(barchart.current).selectAll('svg').remove();
    d3.select('body').selectAll('.barchart-tooltip').remove();
    svg = null;
  }

  useEffect(() => {
    destroyChart();
    drawChart();
  }, [data]);

  return (
    <div
      ref={barchart}
      id='chartwrapper'
      style={{ height: '320px', width: '500px' }}
    />
  );
}

export default BarChart;
