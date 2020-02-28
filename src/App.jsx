import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core';
import Dropdown from './components/Dropdown';
import constants from './static/constants';
import Visualization from './components/Visualization';
import CustomAppBar from './components/AppBar';
import './App.scss';
import parser from './parser';

const { getProteins } = parser;

// const { initialOptions } = constants;

const { innerWidth, innerHeight } = window;

function App() {
  const [currSelection, updateSelection] = useState(null);
  const [scaleVisualization, setScaleVisualization] = useState(false);
  const [isLegendOpen, setLegendState] = useState(true);
  const [proteinOpts, setProteinOpts] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  console.log('TCL: App -> scaleFactor', scaleFactor);

  useEffect(() => {
    getProteins().then(proteins => setProteinOpts(proteins));
  }, []);

  const updateScaleFactor = val => {
    setScaleFactor(val);
  };

  const toggleScaling = () => {
    setScaleVisualization(!scaleVisualization);
  };

  const updateSel = index => {
    updateSelection(null);
    setTimeout(() => updateSelection(index), 500);
  };

  const toggleLegend = () => {
    setLegendState(!isLegendOpen);
  };

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <CustomAppBar
          toggleLegend={toggleLegend}
          scaleVisualization={toggleScaling}
          setScaleFactor={updateScaleFactor}
        />
        <div className="App-dropdown">
          {proteinOpts.length ? (
            <Dropdown options={proteinOpts} updateSel={updateSel} />
          ) : null}
        </div>
        {currSelection != null && Number.isInteger(currSelection) ? (
          <Visualization
            width={innerWidth}
            height={innerHeight}
            currSelection={currSelection}
            isLegendOpen={isLegendOpen}
            initialOptions={proteinOpts}
            scaleVisualization={scaleVisualization}
            scaleFactor={scaleFactor}
          />
        ) : (
          <div className="App-canvas" />
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
