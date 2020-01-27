import React, { useEffect, useRef } from 'react';
import { select, arc } from 'd3';

function SmileyFace(props) {
  const { height, width } = props;
  const svgRef = useRef(null);

  // get attributes from svg
  const getSVGAttr = () => {
    const svg = select('#svg');
    const svgheight = svg.attr('height');
    const svgwidth = svg.attr('width');
    return {
      svgheight,
      svgwidth
    };
  };

  const addFace = () => {
    const svg = select('#svg');
    const circle = svg.append('circle');
    circle
      .attr('r', 200)
      .attr('cx', width / 2)
      .attr('cy', height / 2)
      .attr('fill', 'blue')
      .attr('stroke', 'black');
  };

  const eyeSpacing = 100;
  const eyeYOffset = 70;
  const eyeRadius = 15;
  const eyeBrowWidth = 50;
  const eyeBrowHeight = 10;
  const browSpacing = eyeSpacing + 65;
  const browHeight = 140;

  const groupEyes = () => {
    const svg = select('#svg');
    const eyesG = svg.append('g');
    return eyesG;
  };

  const addLeftEye = eyesG => {
    const leftEye = eyesG.append('circle');
    leftEye
      .attr('r', eyeRadius)
      .attr('cx', width / 2 - eyeSpacing)
      .attr('cy', height / 2 - eyeYOffset);
  };
  const addRightEye = eyesG => {
    const rightEye = eyesG.append('circle');
    rightEye
      .attr('r', eyeRadius)
      .attr('cx', width / 2 + eyeSpacing)
      .attr('cy', height / 2 - eyeYOffset);
  };

  const addEyeBrowse = eyesG => {
    const eyeBrowsG = eyesG.append('g');
    eyeBrowsG
      .attr('transform', `translate(0, ${browHeight})`)
      .transition()
      .duration(2000)
      .attr('transform', `translate(0, ${browHeight - 50})`)
      .transition()
      .duration(2000)
      .attr('transform', `translate(0, ${browHeight})`);

    const leftBrow = eyeBrowsG.append('rect');
    leftBrow
      .attr('x', browSpacing)
      .attr('width', eyeBrowWidth)
      .attr('height', eyeBrowHeight);

    const rightBrow = eyeBrowsG.append('rect');
    rightBrow
      .attr('x', browSpacing + 2 * eyeSpacing)
      .attr('width', eyeBrowWidth)
      .attr('height', eyeBrowHeight);
    // set transition on g element instead of single brow
    // .transition()
    // .duration(2000)
    // .attr('y', browHeight - 40)
    // .transition()
    // .duration(2000)
    // .attr('y', browHeight);
  };

  const addMouth = () => {
    const svg = select('#svg');
    const g = svg.append('g');
    g.attr('transform', `translate(${width / 2}, ${height / 2})`);
    const mouth = g.append('path');
    mouth.attr(
      'd',
      arc()({
        innerRadius: 150,
        outerRadius: 170,
        startAngle: Math.PI / 2,
        endAngle: (Math.PI * 3) / 2
      })
    );
  };

  useEffect(() => {
    const svg = select('#svg');
    svg.style('background-color', 'white');
    addFace();
    addMouth();
    const eyesG = groupEyes();
    addLeftEye(eyesG);
    addRightEye(eyesG);
    addEyeBrowse(eyesG);
  }, [svgRef.current]);

  return (
    <div>
      <svg height={`${height}`} width={`${width}`} ref={svgRef} id="svg">
        <circle />
      </svg>
    </div>
  );
}

export default SmileyFace;
