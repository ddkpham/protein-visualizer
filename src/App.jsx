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
  const [isLegendOpen, setLegendState] = useState(true);
  const [proteinOpts, setProteinOpts] = useState([]);
  useEffect(() => {
    getProteins().then(proteins => setProteinOpts(proteins));
  }, []);

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
        <CustomAppBar toggleLegend={toggleLegend} />
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
          />
        ) : (
          <div className="App-canvas" />
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
