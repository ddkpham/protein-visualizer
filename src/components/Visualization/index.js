import React, { useRef, useEffect, useState } from 'react';
import {
  select,
  csv,
  scaleLinear,
  scaleBand,
  axisLeft,
  axisBottom,
  selectAll
} from 'd3';
import PropTypes from 'prop-types';
import constants from '../../static/constants';
import Legend from '../Legend';
import './index.scss';

const CIRCLE_RADIUS = 5;
const SPINE_HEIGHT = 30;

const { initialOptions, COLOR_PALLETE } = constants;

const calculateBondRanking = array => {
  const pairRanking = [];
  array.forEach((pair, idx) => {
    let total = 1;
    const [low, high] = pair;
    for (let i = 0; i < array.length; i += 1) {
      if (idx !== i) {
        const [currLow, currHigh] = array[i];
        if (low < currLow && high > currHigh) {
          total += 1;
        }
        if (low < currLow && high > currLow && high < currHigh) {
          total += 0.5;
        }
        if (low > currLow && low < currHigh && high > currHigh) {
          total += 0.5;
        }
      }
    }
    pairRanking.push(total);
  });
  return pairRanking;
};

function Visualization(props) {
  const { height, width, currSelection, isLegendOpen } = props;
  const svgRef = useRef(null);
  const [showGlyco, setShowGlyco] = useState(true);
  const [showDisulfide, setShowDisulfide] = useState(true);
  const { disulfideBonds, glycoslation } = initialOptions[currSelection];

  const glycoBonds = initialOptions[currSelection].disulfideBonds.map(pair => {
    const bondPos = [];
    const atoms = pair.split(' ');
    atoms.forEach(el => {
      const atom = parseInt(el, 10);
      bondPos.push(atom);
    });
    return bondPos;
  });
  const pairRanking = calculateBondRanking(glycoBonds);

  const margin = {
    top: height / 15,
    right: width / 15,
    bottom: height / 15,
    left: width / 15
  };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const SULFIDE_POS = innerHeight / 2 + SPINE_HEIGHT / 2;
  const SULFIDE_BOND_LENGTH = 40;
  const SULFIDE_ATOM_OFFSET = 20;

  const GLYCO_STEM_LENGTH = 60;
  const GLYCO_LINK_LENGTH = 10;

  const xScale = scaleLinear()
    .domain([0, initialOptions[currSelection].length])
    .range([0, innerWidth]);

  const bondHeight = idx => {
    const bHeight = SULFIDE_POS + SULFIDE_BOND_LENGTH * pairRanking[idx];
    return bHeight;
  };

  const attachGlycoBonds = g => {
    const { glycoslation } = initialOptions[currSelection];

    const gBonds = glycoslation.map(el => parseInt(el, 10));
    gBonds.forEach(el => {
      const atom = g.append('text');
      atom
        .attr('dx', xScale(el) - 5)
        .attr('dy', SULFIDE_POS + 5)
        .text(() => `N`)
        .attr('class', 'glyco-labels');

      const pos = g.append('text');
      pos
        .attr('dx', xScale(el) + 3)
        .attr('dy', SULFIDE_POS + 7)
        .text(() => `${el}`)
        .attr('class', 'glyco-labels--pos');

      const stem = g.append('line');
      stem
        .attr('x1', xScale(el))
        .attr('y1', SULFIDE_POS - 10)
        .attr('x2', xScale(el))
        .attr('y2', SULFIDE_POS - GLYCO_STEM_LENGTH)
        .style('stroke', 'black');

      const mol1 = g.append('circle');
      mol1
        .attr('cx', xScale(el))
        .attr('cy', SULFIDE_POS - GLYCO_STEM_LENGTH)
        .attr('r', CIRCLE_RADIUS + 3)
        .style('stroke', 'black')
        .style('fill', 'black');

      const link = g.append('line');
      link
        .attr('x1', xScale(el))
        .attr('y1', SULFIDE_POS - GLYCO_STEM_LENGTH)
        .attr('x2', xScale(el))
        .attr('y2', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 2)
        .style('stroke', 'black');

      const link2 = g.append('line');
      link2
        .attr('x1', xScale(el))
        .attr('y1', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 2)
        .attr('x2', xScale(el))
        .attr('y2', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 3.5)
        .style('stroke', 'black');
      const link3 = g.append('line');
      link3
        .attr('x1', xScale(el))
        .attr('y1', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 3.5)
        .attr('x2', xScale(el))
        .attr('y2', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 4.5)
        .style('stroke', 'black');

      const mol2 = g.append('circle');
      mol2
        .attr('cx', xScale(el))
        .attr('cy', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 2)
        .attr('r', CIRCLE_RADIUS + 3)
        .style('stroke', 'black')
        .style('fill', 'grey');

      const mol3 = g.append('rect');
      mol3
        .attr('width', 14)
        .attr('height', 14)
        .attr('x', xScale(el) - 7)
        .attr('y', SULFIDE_POS - GLYCO_STEM_LENGTH - GLYCO_LINK_LENGTH * 5)
        .style('fill', 'white')
        .style('stroke', 'black');
    });
  };

  const attachSulfides = g => {
    const { disulfideBonds } = initialOptions[currSelection];

    const bonds = disulfideBonds.map(pair => {
      const bondPos = [];
      const atoms = pair.split(' ');
      atoms.forEach(el => {
        const atom = parseInt(el, 10);
        bondPos.push(atom);
      });
      return bondPos;
    });

    bonds.forEach((pair, idx) => {
      const [x, y] = pair;
      pair.forEach(el => {
        const atom = g.append('circle');
        atom
          .attr('cx', xScale(el))
          .attr('cy', SULFIDE_POS)
          .attr('r', CIRCLE_RADIUS)
          .style('stroke', 'black')
          .style('fill', COLOR_PALLETE[idx % COLOR_PALLETE.length]);

        const bond = g.append('line');
        bond
          .attr('x1', xScale(el))
          .attr('y1', SULFIDE_POS + 20)
          .attr('x2', xScale(el))
          .attr('y2', bondHeight(idx))
          .style('stroke', 'black');
        const sulfide = g.append('text');
        sulfide
          .attr('dx', xScale(el) - 5)
          .attr('dy', bondHeight(idx) + SULFIDE_ATOM_OFFSET)
          .text(() => 'S');

        const pos = g.append('text');
        pos
          .attr('dx', xScale(el) + 4)
          .attr('dy', bondHeight(idx) + SULFIDE_ATOM_OFFSET + 5)
          .text(() => `${el}`)
          .attr('class', 'sulfide-labels--pos');
      });
      const link = g.append('line');
      link
        .attr('x1', xScale(x))
        .attr('y1', bondHeight(idx))
        .attr('x2', xScale(y))
        .attr('y2', bondHeight(idx))
        .style('stroke', 'black');
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

  const attachNTerminus = g => {
    const NTerm = g.append('text');
    NTerm.attr('dx', margin.left - 50)
      .attr('dy', innerHeight / 2 + 20)
      .text(() => 'NH2--');
  };

  const renderVisualization = () => {
    const svg = select('#svg');
    svg.style('background-color', 'white');

    const g = svg.append('g');
    g.attr('transform', `translate(${margin.left}, ${margin.top})`);
    attachSpine(g);
    if (showDisulfide) {
      attachSulfides(g);
    }
    if (showGlyco) {
      attachGlycoBonds(g);
    }
    attachNTerminus(g);
  };
  const removeElements = () => {
    const svgEls = ['text', 'line', 'circle', 'rect'];
    svgEls.forEach(el => {
      const allNodes = selectAll(el);
      allNodes.remove();
    });
  };

  useEffect(() => {
    removeElements();
    renderVisualization();
  }, [svgRef.current, showDisulfide, showGlyco]);

  const svg = Number.isInteger(currSelection) ? (
    <svg height={`${height}`} width={`${width}`} ref={svgRef} id="svg">
      <rect />
    </svg>
  ) : null;

  return (
    <div>
      {isLegendOpen ? (
        <Legend
          glycoslation={glycoslation}
          disulfideBonds={disulfideBonds}
          toggleGlyco={setShowGlyco}
          toggleSulfide={setShowDisulfide}
        />
      ) : null}
      {svg}
    </div>
  );
}

Visualization.propTypes = {
  isLegendOpen: PropTypes.bool,
  height: PropTypes.number,
  width: PropTypes.number,
  currSelection: PropTypes.number.isRequired
};

Visualization.defaultProps = {
  isLegendOpen: false,
  height: 500,
  width: 500
};

export default Visualization;
