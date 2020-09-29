import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';
import './index.scss';

function Heatmap({ data }) {
  const ref = useRef();
  useEffect(() => {
    if (data) draw();
  }, [data]);

  const draw = () => {
    const cellSize = 20;
    const numYears = 11;
    const margin = { top: 30, right: 0, bottom: 30, left: 50 },
      width = 1000 - margin.left - margin.right,
      height = cellSize * numYears - 10;
    var x = d3.scaleBand().range([0, width]);
    var y = d3.scaleTime().range([height, 0]);
    const date = (year) => new Date(Date.parse(year));

    const svg = d3
      .select(ref.current)
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    const states = d3
      .set(
        data.map((d) => {
          return d.state;
        })
      )
      .values();
    y.domain(d3.extent(data, (d) => date(d.year)));
    x.domain(states);

    var color = d3
      .scaleQuantize()
      .domain(d3.extent(data, (d) => d.tuition))
      .range(['#bdb7d6', '#948DB3', '#605885', '#433B67']);

    svg
      .selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('width', cellSize)
      .attr('height', cellSize)
      .attr('x', (d) => x(d.state))

      .attr('y', (d) => y(date(d.year)) - cellSize)

      .attr('fill', (d) => color(d.tuition))
      .style('stroke', '#d6cdb7')

      .on('mouseover', function (d) {
        div.transition().duration(200).style('opacity', 0.9);
        div
          .html(d.uni + '<br/>$' + d.tuition)
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', function (d) {
        div.transition().duration(500).style('opacity', 0);
      });

    var xAxis = d3.axisBottom(x);
    var yAxis = d3.axisLeft(y);

    svg
      .append('g')
      .classed('x axis', true)
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis);

    svg.append('g').classed('y axis', true).call(yAxis);

    var div = d3
      .select('.chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);

    var tuition = d3
      .set(
        data.map((d) => {
          return d.tuition;
        })
      )
      .values();
    tuition.sort(function (a, b) {
      return a - b;
    });
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default Heatmap;
