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
  const [fullScale, setFullScale] = useState(false);
  const [fullScaleDisabled, setFullScaleDisabled] = useState(true);
  console.log('TCL: App -> fullScaleDisabled', fullScaleDisabled);

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

  const toggleFullScale = () => {
    setFullScale(!fullScale);
  };

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <CustomAppBar
          toggleLegend={toggleLegend}
          scaleVisualization={toggleScaling}
          setScaleFactor={updateScaleFactor}
          toggleFullScale={toggleFullScale}
          disableFullScale={fullScaleDisabled}
          fullScale={fullScale}
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
            fullScale={fullScale}
            setFullScaleDisabled={setFullScaleDisabled}
          />
        ) : (
          <div className="App-canvas" />
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
