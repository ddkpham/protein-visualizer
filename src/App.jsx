import React, { useState } from 'react';
import { StylesProvider } from '@material-ui/core';
import Dropdown from './components/Dropdown';
import constants from './static/constants';
import Visualization from './components/Visualization';
import './App.scss';

const { initialOptions } = constants;

const { innerWidth, innerHeight } = window;

function App() {
  const [currSelection, updateSelection] = useState(null);

  const updateSel = index => {
    updateSelection(null);
    setTimeout(() => updateSelection(index), 500);
  };

  return (
    <StylesProvider injectFirst>
      <div className="App">
        <header className="App-header">
          Disulfide bond and Glycoslyation Visualization
        </header>
        <div className="App-dropdown">
          <Dropdown options={initialOptions} updateSel={updateSel} />
        </div>
        {currSelection != null && Number.isInteger(currSelection) ? (
          <Visualization
            width={innerWidth}
            height={innerHeight}
            currSelection={currSelection}
          />
        ) : (
          <div className="App-canvas" />
        )}
      </div>
    </StylesProvider>
  );
}

export default App;
