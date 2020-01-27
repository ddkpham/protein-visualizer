import React from 'react';
import { StylesProvider } from '@material-ui/core';
import Dropdown from './components/Dropdown';
import constants from './static/constants';
import BarChart from './components/D3Examples/BarChart';
import './App.scss';

const { initialOptions } = constants;

function App() {
  return (
    <StylesProvider injectFirst>
      <div className="App">
        <header className="App-header">
          Disulfide bond and Glycoslyation Visualization
        </header>
        <div className="App-dropdown">
          <Dropdown options={initialOptions} />
        </div>
        <div className="App-canvas">Visualization</div>
        <BarChart width={600} height={500} />
      </div>
    </StylesProvider>
  );
}

export default App;
