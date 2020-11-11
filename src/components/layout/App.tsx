import React, { useState } from 'react';
import useScreenData, { ScreenFormData, StoredScreenFormProps } from '../../hooks/useScreenData';
import copyToClipboard from '../../utils/copyToClipboard';
import {
  AvailableUnit,
  getScreenInfo,
  ScreenInfo,
  toCentimeters,
  toInches,
  tryParsePositiveFloat,
  UnitOptions,
} from '../../utils/ScreenInfo';
import ScreenForm, { ScreenFormChangedProps } from '../forms/ScreenForm';
import ToggleSwitch from '../forms/ToggleSwitch';
import icons from '../common/icons';
import './App.css';

const buildScreenInfoYamlEntry = function buildScreenInfoYamlEntryOfArray(
  screenInfo: ScreenInfo,
  options: UnitOptions,
): string {
  const map = screenInfo.toMap(options);
  return '- ' + Array.from(map.keys()).map((key) => `${key}: ${map.get(key)}`).join('\n  ');
};

const getWholeYaml = function getWholeYamlFromScreenFormData(
  screenFormData: StoredScreenFormProps[],
  options: UnitOptions = { diagonalUnit: 'in', sizeUnit: 'cm' },
): string {
  const screens: ScreenInfo[] = screenFormData.reduce<ScreenInfo[]>(
    (acc: ScreenInfo[], props: StoredScreenFormProps) => {
      const { width, height, diagonal }: StoredScreenFormProps = props;
      const screenInfo: ScreenInfo | null = getScreenInfo(width, height, diagonal, options.diagonalUnit);
      if (screenInfo !== null) {
        acc.push(screenInfo);
      }
      return acc;
    },
    []
  );
  const yamls: string[] = screens.map((screen: ScreenInfo) => buildScreenInfoYamlEntry(screen, options));
  return yamls.join('\n\n') + '\n';
};

const toFixedWithoutTrailingZero = function toFixedWithoutTrailingZero(value: number, length: number): string {
  const integerPart: number = Math.floor(value);
  if (integerPart === value) {
    return value.toString();
  }

  const integerLength: number = integerPart.toString().length;
  const mantissaLength: number = length - integerLength - 1;
  return value.toFixed(mantissaLength).replace(/\.?0+$/, '');
};

function App() {
  const screenData = useScreenData();
  const [ diagonalUnit, setDiagonalUnit ] = useState<AvailableUnit>('in');
  const [ sizeUnit, setSizeUnit ] = useState<AvailableUnit>('cm');

  const handleCopyClick = function handleCopyAsYamlClick(): void {
    copyToClipboard(getWholeYaml(screenData.idOrder.map((id) => screenData.data[id]), { diagonalUnit, sizeUnit }));
  };

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    screenData.add({
      diagonalUnit,
      sizeUnit,
      width: '',
      height: '',
      diagonal: '',
    });
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
    setDiagonalUnit(nextUnit);

    const nextScreenData: ScreenFormData = {};

    for (const id of screenData.idOrder) {
      const parsedDiagonal: number | null = tryParsePositiveFloat(screenData.data[id]?.diagonal);
      if (typeof parsedDiagonal === 'number') {
        nextScreenData[id] = {
          ...screenData.data[id],
          diagonal: nextUnit === 'in'
            ? toFixedWithoutTrailingZero(toInches(parsedDiagonal), 6)
            : toFixedWithoutTrailingZero(toCentimeters(parsedDiagonal), 6),
          diagonalUnit: nextUnit,
        };
      } else {
        nextScreenData[id] = {
          ...screenData.data[id],
          diagonalUnit: nextUnit,
        };
      }
    }
    screenData.replace(nextScreenData);
  };

  const handleSizeUnitChange = function handleSizeUnitToggleChange(checked: boolean): void {
    const nextUnit: AvailableUnit = checked ? 'in' : 'cm';
    setSizeUnit(nextUnit);

    const nextScreenData: ScreenFormData = {};

    for (const id of screenData.idOrder) {
      nextScreenData[id] = {
        ...screenData.data[id],
        sizeUnit: nextUnit,
      };
    }
    screenData.replace(nextScreenData);
  };

  const screenForms = screenData.idOrder.map((id) => (
    <ScreenForm
      { ...screenData.data[id] }
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
            <img src={icons.copy} alt="Copy all" />
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
            <img src={icons.add} alt="Add" />
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
                checked={sizeUnit === 'in'}
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
                checked={diagonalUnit === 'in'}
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
