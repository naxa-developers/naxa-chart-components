import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function inArray(value, array) {
  return array.findIndex((item, i) => item === value);
}

function StackedBarChart({ data }) {
  const ref = useRef();

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    var margin = { top: 10, right: 30, bottom: 20, left: 50 },
      width = 460 - margin.left - margin.right,
      height = 400 - margin.top - margin.bottom;

    var svg = d3
      .select(ref.current)

      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

    var subgroups = Object.keys(data[0]).slice(1);

    var groups = d3
      .map(data, function (d) {
        return d.group;
      })
      .keys();

    var x = d3.scaleBand().domain(groups).range([0, width]).padding([0.2]);
    svg
      .append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(d3.axisBottom(x).tickSizeOuter(0));

    var y = d3.scaleLinear().domain([0, 60]).range([height, 0]);
    svg.append('g').call(d3.axisLeft(y));

    var color = d3
      .scaleOrdinal()
      .domain(subgroups)
      .range(['#e41a1c', '#377eb8', '#4daf4a']);

    var stackedData = d3.stack().keys(subgroups)(data);

    svg
      .append('g')
      .selectAll('g')

      .data(stackedData)
      .enter()
      .append('g')
      .attr('fill', function (d) {
        return color(d.key);
      })
      .selectAll('rect')

      .data(function (d) {
        return d;
      })
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return x(d.data.group);
      })
      .attr('y', function (d) {
        return y(d[1]);
      })
      .attr('height', function (d) {
        return y(d[0]) - y(d[1]);
      })
      .attr('width', x.bandwidth())

      .on('mouseover', function (d, i) {
        var subgroupName = d3.select(this.parentNode).datum().key;
        var subgroupValue = d.data[subgroupName];

        div.transition().duration(200).style('opacity', 0.9);
        div
          .html(
            'subgroup: ' + subgroupName + '<br>' + 'Value: ' + subgroupValue
          )
          .style('left', d3.event.pageX + 'px')
          .style('top', d3.event.pageY - 28 + 'px');
      })
      .on('mouseout', function (d) {
        div.transition().duration(500).style('opacity', 0);
      });

    var div = d3
      .select('.stacked-bar-chart')
      .append('div')
      .attr('class', 'tooltip')
      .style('opacity', 0);
  };

  return (
    <div className="stacked-bar-chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default StackedBarChart;
