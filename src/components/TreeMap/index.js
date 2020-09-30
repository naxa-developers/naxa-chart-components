import * as d3 from 'd3';
import React, { useRef, useEffect } from 'react';

function Treemap({ width = 600, height = 600, data }) {
  const ref = useRef();

  useEffect(() => {
    const svg = d3
      .select(ref.current)
      .attr('width', width)
      .attr('height', height)
      .style('border', '1px solid black');
  }, []);

  useEffect(() => {
    draw();
  }, [data]);

  const draw = () => {
    const svg = d3.select(ref.current);

    var root = d3.hierarchy(data).sum(function (d) {
      return d.value;
    });

    d3
      .treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingRight(7)
      .paddingInner(3)(root);

    const color = d3
      .scaleOrdinal()
      .domain(['boss1', 'boss2', 'boss3', 'boss4'])
      .range(['#402D54', '#D18975', '#8FD175', '#3182bd']);

    const opacity = d3.scaleLinear().domain([10, 30]).range([0.5, 1]);

    var nodes = svg.selectAll('rect').data(root.leaves());

    nodes
      .transition()
      .duration(300)
      .attr('x', function (d) {
        return d.x0;
      })
      .attr('y', function (d) {
        return d.y0;
      })
      .attr('width', function (d) {
        return d.x1 - d.x0;
      })
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .style('opacity', function (d) {
        return opacity(d.data.value);
      })
      .style('fill', function (d) {
        return color(d.parent.data.name);
      });

    nodes
      .enter()
      .append('rect')
      .attr('x', function (d) {
        return d.x0;
      })
      .attr('y', function (d) {
        return d.y0;
      })
      .attr('width', function (d) {
        return d.x1 - d.x0;
      })
      .attr('height', function (d) {
        return d.y1 - d.y0;
      })
      .style('stroke', 'black')
      .style('fill', function (d) {
        return color(d.parent.data.name);
      })
      .style('opacity', function (d) {
        return opacity(d.data.value);
      });

    nodes.exit().remove();

    var nodeText = svg.selectAll('text').data(root.leaves());

    nodeText
      .transition()
      .duration(300)
      .attr('x', function (d) {
        return d.x0 + 5;
      })
      .attr('y', function (d) {
        return d.y0 + 20;
      })
      .text(function (d) {
        return d.data.name.replace('mister_', '');
      });

    nodeText
      .enter()
      .append('text')
      .attr('x', function (d) {
        return d.x0 + 5;
      })
      .attr('y', function (d) {
        return d.y0 + 20;
      })
      .text(function (d) {
        return d.data.name.replace('mister_', '');
      })
      .attr('font-size', '19px')
      .attr('fill', 'white');

    nodeText.exit().remove();

    var nodeVals = svg.selectAll('vals').data(root.leaves());

    nodeVals
      .transition()
      .duration(300)
      .attr('x', function (d) {
        return d.x0 + 5;
      })
      .attr('y', function (d) {
        return d.y0 + 35;
      })
      .text(function (d) {
        return d.data.value;
      });

    nodeVals
      .enter()
      .append('text')
      .attr('x', function (d) {
        return d.x0 + 5;
      })
      .attr('y', function (d) {
        return d.y0 + 35;
      })
      .text(function (d) {
        return d.data.value;
      })
      .attr('font-size', '11px')
      .attr('fill', 'white');

    nodeVals.exit().remove();

    svg
      .selectAll('titles')
      .data(
        root.descendants().filter(function (d) {
          return d.depth == 1;
        })
      )
      .enter()
      .append('text')
      .attr('x', function (d) {
        return d.x0;
      })
      .attr('y', function (d) {
        return d.y0 + 21;
      })
      .text(function (d) {
        return d.data.name;
      })
      .attr('font-size', '19px')
      .attr('fill', function (d) {
        return color(d.data.name);
      });

    svg
      .append('text')
      .attr('x', 0)
      .attr('y', 14)
      .text('Three groups and 14 subgroups')
      .attr('font-size', '19px')
      .attr('fill', 'grey');
  };

  return (
    <div className="chart">
      <svg ref={ref}></svg>
    </div>
  );
}

export default Treemap;
