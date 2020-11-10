import React, { useState } from 'react';
import copyToClipboard from '../../utils/copyToClipboard';
import {
  AvailableUnit,
  getScreenInfo,
  ScreenInfo,
  toCentimeters,
  toInches,
  tryParsePositiveFloat,
} from '../../utils/ScreenInfo';
import ReactSetState from '../../utils/ReactSetState';
import ScreenForm, { ScreenFormChangedProps } from '../forms/ScreenForm';
import ToggleSwitch from '../forms/ToggleSwitch';
import icons from '../common/icons';
import './App.css';

interface StoredScreenFormProps {
  id: number,
  width: string,
  height: string,
  diagonal: string,
  diagonalUnit: AvailableUnit,
  sizeUnit: AvailableUnit,
}

interface ScreenFormData {
  [id: number]: StoredScreenFormProps,
}

interface AddNewScreenFormParam {
  screenData: ScreenFormData,
  setScreenData: ReactSetState<ScreenFormData>,
  screenIdOrder: number[],
  setScreenIdOrder: ReactSetState<number[]>,
  nextId: number,
  setNextId: ReactSetState<number>,
}

const buildScreenInfoYamlEntry = function buildScreenInfoYamlEntryOfArray(screenInfo: ScreenInfo): string {
  const map = screenInfo.toMap();
  return '- ' + Array.from(map.keys()).map((key) => `${key}: ${map.get(key)}`).join('\n  ');
};

const getWholeYaml = function getWholeYamlFromScreenFormData(screenFormData: StoredScreenFormProps[]): string {
  const screens: ScreenInfo[] = screenFormData.reduce<ScreenInfo[]>(
    (acc: ScreenInfo[], props: StoredScreenFormProps) => {
      const { width, height, diagonal }: StoredScreenFormProps = props;
      const screenInfo: ScreenInfo | null = getScreenInfo(width, height, diagonal);
      if (screenInfo !== null) {
        acc.push(screenInfo);
      }
      return acc;
    },
    []
  );
  const yamls: string[] = screens.map((screen: ScreenInfo) => buildScreenInfoYamlEntry(screen));
  return yamls.join('\n\n') + '\n';
};

const addNewScreenForm = function addNewScreenFormToApp(
  { screenData, setScreenData, screenIdOrder, setScreenIdOrder, nextId, setNextId }: AddNewScreenFormParam,
  { diagonalUnit = 'in', sizeUnit = 'cm' }: { diagonalUnit: AvailableUnit, sizeUnit: AvailableUnit },
): void {
  const id = nextId;
  setNextId(nextId + 1);

  const newScreenFormProps: StoredScreenFormProps = {
    id,
    diagonalUnit,
    sizeUnit,
    width: '',
    height: '',
    diagonal: '',
  };

  const nextScreenData: ScreenFormData = { ...screenData, [id]: newScreenFormProps };
  setScreenData(nextScreenData);

  const nextScreenIdOrder: number[] = [ ...screenIdOrder, id ];
  setScreenIdOrder(nextScreenIdOrder);
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
  const [ screenData, setScreenData ] = useState<ScreenFormData>({});
  const [ screenIdOrder, setScreenIdOrder ] = useState<number[]>([]);
  const [ nextId, setNextId ] = useState<number>(0);
  const [ diagonalUnit, setDiagonalUnit ] = useState<AvailableUnit>('in');
  const [ sizeUnit, setSizeUnit ] = useState<AvailableUnit>('cm');

  const handleCopyClick = function handleCopyAsYamlClick(): void {
    copyToClipboard(getWholeYaml(screenIdOrder.map((id) => screenData[id])));
  };

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    addNewScreenForm(
      { screenData, setScreenData, screenIdOrder, setScreenIdOrder, nextId, setNextId },
      { diagonalUnit, sizeUnit },
    );
  };

  const handleScreenFormChange = function handleScreenFormChangeById(
    id: number,
    changed: ScreenFormChangedProps,
  ): void {
    const nextScreenFormProps: StoredScreenFormProps = { ...screenData[id], ...changed };
    const nextScreenData: ScreenFormData = { ...screenData, [id]: nextScreenFormProps };
    setScreenData(nextScreenData);
  };

  const handleScreenFormRemove = function handleScreenFormRemoveById(id: number): void {
    const nextScreenData: ScreenFormData = { ...screenData };
    delete nextScreenData[id];
    setScreenData(nextScreenData);

    const nextScreenIdOrder: number[] = screenIdOrder.filter((value) => value !== id);
    setScreenIdOrder(nextScreenIdOrder);
  };

  const handleDiagonalUnitChange = function handleDiagonalUnitToggleChange(checked: boolean): void {
    const nextUnit: AvailableUnit = checked ? 'in' : 'cm';
    setDiagonalUnit(nextUnit);

    const nextScreenData: ScreenFormData = {};

    for (const id of screenIdOrder) {
      const parsedDiagonal: number | null = tryParsePositiveFloat(screenData[id]?.diagonal);
      if (typeof parsedDiagonal === 'number') {
        nextScreenData[id] = {
          ...screenData[id],
          diagonal: nextUnit === 'in'
            ? toFixedWithoutTrailingZero(toInches(parsedDiagonal), 6)
            : toFixedWithoutTrailingZero(toCentimeters(parsedDiagonal), 6),
          diagonalUnit: nextUnit,
        };
      } else {
        nextScreenData[id] = {
          ...screenData[id],
          diagonalUnit: nextUnit,
        };
      }
    }
    setScreenData(nextScreenData);
  };

  const handleSizeUnitChange = function handleSizeUnitToggleChange(checked: boolean): void {
    const nextUnit: AvailableUnit = checked ? 'in' : 'cm';
    setSizeUnit(nextUnit);

    const nextScreenData: ScreenFormData = {};

    for (const id of screenIdOrder) {
      nextScreenData[id] = {
        ...screenData[id],
        sizeUnit: nextUnit,
      };
    }
    setScreenData(nextScreenData);
  };

  const screenForms = screenIdOrder.map((id) => (
    <ScreenForm
      { ...screenData[id] }
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
