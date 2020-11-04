import React, { useState } from 'react';
import copyToClipboard from '../../utils/copyToClipboard';
import {
  getScreenInfo,
  ScreenInfo,
} from '../../utils/ScreenInfo';
import ReactSetState from '../../utils/ReactSetState';
import ScreenForm, { ScreenFormChangedProps } from '../forms/ScreenForm';
import ToggleSwitch from '../forms/ToggleSwitch';
import icons from '../common/icons';
import './App.css';

interface ScreenFormProps {
  id: number,
  width: string,
  height: string,
  diagonal: string,
}

interface ScreenFormData {
  [id: number]: ScreenFormProps,
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

const getWholeYaml = function getWholeYamlFromScreenFormData(screenFormData: ScreenFormProps[]): string {
  const screens: ScreenInfo[] = screenFormData.reduce<ScreenInfo[]>(
    (acc: ScreenInfo[], props: ScreenFormProps) => {
      const { width, height, diagonal }: ScreenFormProps = props;
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
  {
    screenData,
    setScreenData,
    screenIdOrder,
    setScreenIdOrder,
    nextId,
    setNextId,
  }: AddNewScreenFormParam
): void {
  const id = nextId;
  setNextId(nextId + 1);

  const newScreenFormProps: ScreenFormProps = {
    id,
    width: '',
    height: '',
    diagonal: '',
  };

  const nextScreenData: ScreenFormData = { ...screenData, [id]: newScreenFormProps };
  setScreenData(nextScreenData);

  const nextScreenIdOrder: number[] = [ ...screenIdOrder, id ];
  setScreenIdOrder(nextScreenIdOrder);
};

function App() {
  const [ screenData, setScreenData ] = useState<ScreenFormData>({});
  const [ screenIdOrder, setScreenIdOrder ] = useState<number[]>([]);
  const [ nextId, setNextId ] = useState(0);
  const [ diagonalUnit, setDiagonalUnit ] = useState<'cm' | 'in'>('in');
  const [ sideUnit, setSideUnit ] = useState<'cm' | 'in'>('cm');

  const handleCopyClick = function handleCopyAsYamlClick(): void {
    copyToClipboard(getWholeYaml(screenIdOrder.map((id) => screenData[id])));
  };

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    addNewScreenForm(
      { screenData, setScreenData, screenIdOrder, setScreenIdOrder, nextId, setNextId }
    );
  };

  const handleScreenFormChange = function handleScreenFormChangeById(
    id: number,
    changed: ScreenFormChangedProps,
  ): void {
    const nextScreenFormProps: ScreenFormProps = { ...screenData[id], ...changed };
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

  const handleDiagonalUnitChange = function handleDiagonalUnitChange(checked: boolean): void {
    setDiagonalUnit(checked ? 'in' : 'cm');
  };

  const handleSideUnitChange = function handleSideUnitChange(checked: boolean): void {
    setSideUnit(checked ? 'in' : 'cm');
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
                checked={sideUnit === 'in'}
                onChange={handleSideUnitChange}
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
