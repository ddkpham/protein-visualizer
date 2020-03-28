import React, { useState, useEffect } from 'react';
import { StylesProvider } from '@material-ui/core';
import Dropdown from './components/Dropdown';
import Visualization from './components/Visualization';
import CustomAppBar from './components/AppBar';
import Introduction from './components/Introduction';
import './App.scss';
import parser from './parser';

const { getProteins } = parser;

const { innerWidth, innerHeight } = window;

function App() {
  const [currSelection, updateSelection] = useState(null);
  const [showIntro, setShowIntro] = useState(true);
  const [scaleVisualization, setScaleVisualization] = useState(false);
  const [isLegendOpen, setLegendState] = useState(true);
  const [proteinOpts, setProteinOpts] = useState([]);
  const [scaleFactor, setScaleFactor] = useState(1);
  const [fullScale, setFullScale] = useState(false);
  const [fullScaleDisabled, setFullScaleDisabled] = useState(true);

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
    setShowIntro(false);
    setTimeout(() => updateSelection(index), 500);
    if (!Number.isInteger(index)) {
      setShowIntro(true);
    }
  };

  const toggleLegend = () => {
    setLegendState(!isLegendOpen);
  };

  const toggleFullScale = () => {
    setFullScale(!fullScale);
  };

  const intro = showIntro ? <Introduction /> : null;

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
            scaleFactor={scaleFactor}
            fullScale={fullScale}
            setFullScaleDisabled={setFullScaleDisabled}
          />
        ) : (
          <div>{intro}</div>
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
