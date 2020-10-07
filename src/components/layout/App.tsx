import React from 'react';
import './App.css';

function App() {
  return (
    <div className="App" data-testid="App">
      <header className="App-header">
        <h1 className="App-header-title">
          Aspect Ratio Calculator
        </h1>
      </header>

      <main className="App-main">
        {/* TODO - Place screenForms: JSX.Element[] here. ScreenForm's below are for testing CSS. */}

        <div className="App-main-add">
          <div className="App-main-add-ratio" />
          <button
            className="App-main-add-button"
            type="button"
          >
            Add
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
