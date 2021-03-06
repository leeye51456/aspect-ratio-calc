import React from 'react';
import useScreenData, { NewScreenFormProps } from '../../hooks/useScreenData';
import copyToClipboard from '../../utils/copyToClipboard';
import { AvailableUnit } from '../../utils/ScreenInfo';
import { getWholeYaml } from '../../utils/yaml';
import ScreenForm, { ScreenFormChangedProps } from '../forms/ScreenForm';
import ToggleSwitch from '../forms/ToggleSwitch';
import icons from '../common/icons';
import './App.css';

const getDefaultScreen = function getDefaultScreenData(): NewScreenFormProps {
  const { devicePixelRatio = 1, screen: { width, height } }: Window = window;
  return {
    width: (width * devicePixelRatio).toString(),
    height: (height * devicePixelRatio).toString(),
    diagonal: '',
  };
}

function App() {
  const screenData = useScreenData();

  const handleCopyClick = function handleCopyAsYamlClick(): void {
    const { data, idOrder, units: { diagonal: diagonalUnit, size: sizeUnit } } = screenData;
    copyToClipboard(getWholeYaml(idOrder.map((id) => data[id]), { diagonalUnit, sizeUnit }));
  };

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    screenData.add(getDefaultScreen());
  };

  const handleScreenFormChange = function handleScreenFormChangeById(
    id: number,
    changed: ScreenFormChangedProps,
  ): void {
    screenData.update(id, changed);
  };

  const handleScreenFormRemove = function handleScreenFormRemoveById(id: number): void {
    screenData.remove(id);
  };

  const handleDiagonalUnitChange = function handleDiagonalUnitToggleChange(checked: boolean): void {
    const nextUnit: AvailableUnit = checked ? 'in' : 'cm';
    screenData.units.change({ diagonal: nextUnit });
  };

  const handleSizeUnitChange = function handleSizeUnitToggleChange(checked: boolean): void {
    const nextUnit: AvailableUnit = checked ? 'in' : 'cm';
    screenData.units.change({ size: nextUnit });
  };

  const screenForms = screenData.idOrder.map((id) => (
    <ScreenForm
      { ...screenData.data[id] }
      diagonalUnit={screenData.units.diagonal}
      sizeUnit={screenData.units.size}
      key={id}
      onChange={handleScreenFormChange}
      onRemove={handleScreenFormRemove}
    />
  ));

  return (
    <div className="App" data-testid="App">
      <header className="App-header">
        <h1 className="App-header-title">
          Aspect Ratio Calculator
        </h1>
        <div className="App-header-button-container">
          <button
            className="App-header-button"
            type="button"
            onClick={handleCopyClick}
          >
            <img src={icons.copy} alt="Copy all" width={24} height={24} />
          </button>
        </div>
      </header>

      <main className="App-main">
        {screenForms}

        <div className="App-main-add">
          <div className="App-main-add-ratio" />
          <button
            className="App-main-add-button"
            type="button"
            onClick={handleAddClick}
          >
            <img src={icons.add} alt="Add" width={24} height={24} />
          </button>
        </div>
      </main>

      <footer className="App-footer">
        <h2 className="App-footer-title">
          Options
        </h2>
        <ul className="App-footer-config">
          <li className="App-footer-config-list">
            <span className="App-footer-config-key">
              Width/Height
            </span>
            <span className="App-footer-config-value">
              <ToggleSwitch
                checkedSideLabel="in"
                uncheckedSideLabel="cm"
                checked={screenData.units.size === 'in'}
                onChange={handleSizeUnitChange}
              />
            </span>
          </li>
          <li className="App-footer-config-list">
            <span className="App-footer-config-key">
              Diagonal
            </span>
            <span className="App-footer-config-value">
              <ToggleSwitch
                checkedSideLabel="in"
                uncheckedSideLabel="cm"
                checked={screenData.units.diagonal === 'in'}
                onChange={handleDiagonalUnitChange}
              />
            </span>
          </li>
        </ul>
      </footer>
    </div>
  );
}

export default App;
