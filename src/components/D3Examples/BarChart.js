import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  csv,
  scaleLinear,
  max,
  scaleBand,
  axisLeft,
  axisBottom
} from 'd3';
import PropTypes from 'prop-types';
import csvData from './data.csv';
import './BarChart.scss';

function BarChart(props) {
  const svgRef = useRef(null);
  const { height, width } = props;
  const [barData, setBarData] = useState(null);

  const render = data => {
    const xValue = d => d.population;
    const yValue = d => d.country;

    const margin = { top: 20, right: 20, bottom: 20, left: 100 };
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;
    // maps a domain to a range
    const xScale = scaleLinear()
      .domain([0, max(data, xValue)])
      .range([0, innerWidth]);

    const yScale = scaleBand()
      .domain(data.map(yValue))
      .range([0, innerHeight])
      .padding(0.1);

    const svg = select('#svg');
    const g = svg.append('g');
    g.attr('transform', `translate(${margin.left}, ${margin.top})`);

    // create Axis
    g.append('g').call(axisLeft(yScale));
    g.append('g')
      .call(axisBottom(xScale))
      .attr('transform', `translate(0, ${innerHeight})`);
    // move x axis down
    // join empty rect svg AND csv data, then enter elements to create data rect svgs
    g.selectAll('rect')
      .data(data)
      .enter()
      .append('rect')
      .attr('y', d => yScale(yValue(d)))
      .attr('width', d => xScale(xValue(d)))
      .attr('height', yScale.bandwidth());
  };

  useEffect(() => {
    async function getData() {
      const data = await csv(csvData);
      return data;
    }
    getData().then(data => {
      data.forEach(d => {
        // eslint-disable-next-line no-param-reassign
        d.population = +d.population * 1000;
      });
      setBarData(data);
      render(data);
    });
  }, []);

  useEffect(() => {
    const svg = select('#svg');
    svg.style('background-color', 'white');
  }, [svgRef.current]);
  return (
    <div>
      <svg height={`${height}`} width={`${width}`} ref={svgRef} id="svg">
        <rect />
      </svg>
    </div>
  );
}

BarChart.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

BarChart.defaultProps = {
  height: 500,
  width: 500
};

export default BarChart;
