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
import constants from '../../static/constants';

const CIRCLE_RADIUS = 5;
const SPINE_HEIGHT = 40;

const { initialOptions } = constants;

function Visualization(props) {
  const { height, width } = props;
  const svgRef = useRef(null);

  const margin = {
    top: height / 15,
    right: width / 15,
    bottom: height / 15,
    left: width / 15
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const SULFIDE_POS = innerHeight / 2 + SPINE_HEIGHT / 2;

  const xScale = scaleLinear()
    .domain([0, initialOptions[1].length])
    .range([0, innerWidth]);

  const attachGlycoBonds = g => {
    const { glycoslation } = initialOptions[1];

    const glycoBonds = glycoslation.map(el => parseInt(el, 10));
    glycoBonds.forEach(el => {
      const bond = g.append('line');
      bond
        .attr('x1', xScale(el))
        .attr('y1', SULFIDE_POS)
        .attr('x2', xScale(el))
        .attr('y2', SULFIDE_POS - 30)
        .style('stroke', 'black');
    });
  };

  const attachSulfides = g => {
    const { disulfideBonds } = initialOptions[1];

    const bonds = disulfideBonds.map(pair => {
      const bondPos = [];
      const atoms = pair.split(' ');
      atoms.forEach(el => {
        const atom = parseInt(el, 10);
        bondPos.push(atom);
      });
      return bondPos;
    });
    console.log('TCL: Visualization -> bonds', bonds);

    bonds.forEach(pair => {
      pair.forEach(el => {
        const atom = g.append('circle');
        atom
          .attr('cx', xScale(el))
          .attr('cy', SULFIDE_POS)
          .attr('r', CIRCLE_RADIUS)
          .style('stroke', 'black')
          .style('fill', 'red');

        const text = g.append('text');
        text
          .attr('dx', xScale(el) - 15)
          .attr('dy', SULFIDE_POS + 20)
          .text(() => el);
      });
    });
  };

  const attachSpine = g => {
    const spineBase = g.append('rect');
    spineBase
      .attr('width', innerWidth - 2 * margin.left)
      .attr('height', SPINE_HEIGHT)
      .attr('x', margin.left)
      .attr('y', innerHeight / 2)
      .style('fill', 'white')
      .style('stroke', 'black');
  };

  useEffect(() => {
    const svg = select('#svg');
    svg.style('background-color', 'white');

    const g = svg.append('g');
    g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    attachSpine(g);
    attachSulfides(g);
    attachGlycoBonds(g);
  }, [svgRef.current]);

  return (
    <div>
      <svg height={`${height}`} width={`${width}`} ref={svgRef} id="svg">
        <rect />
      </svg>
    </div>
  );
}

Visualization.propTypes = {
  height: PropTypes.number,
  width: PropTypes.number
};

Visualization.defaultProps = {
  height: 500,
  width: 500
};

export default Visualization;
