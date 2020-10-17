import React, { useState } from 'react';
import getAspectRatioString from '../../utils/getAspectRatioString';
import { getScreenInfo, ScreenInfo } from '../../utils/ScreenInfo';
import ReactSetState from '../../utils/ReactSetState';
import ScreenForm, { ScreenFormPropName } from '../forms/ScreenForm';
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

const buildScreenInfoYaml = function buildYamlFromScreenInfo(screenInfo: ScreenInfo): string {
  const { pixelCount, diagonal, ratio, dpi, dotPitch, size }: ScreenInfo = screenInfo;
  return '- ' + [
    `Screen: ${pixelCount.width} x ${pixelCount.height}`,
    `Diagonal: ${diagonal}"`,
    `AspectRatio: ${ratio.toFixed(2)}:1 (${getAspectRatioString(ratio)})`,
    `DPI: ${dpi.toFixed(2)}`,
    `DotPitch: ${dotPitch.toFixed(4)}`,
    `Size: ${size.width.toFixed(2)} cm x ${size.height.toFixed(2)} cm`,
    `PixelCount: ${pixelCount.total}`,
  ].join('\n  ');
};

const getWholeYaml = function getWholeYamlFromScreenFormData(screenFormData: ScreenFormProps[]): string {
  const screens: ScreenInfo[] = screenFormData.reduce<ScreenInfo[]>((acc: ScreenInfo[], props: ScreenFormProps) => {
    const { width, height, diagonal }: ScreenFormProps = props;
    const screenInfo: ScreenInfo | null = getScreenInfo(width, height, diagonal);
    if (screenInfo !== null) {
      acc.push(screenInfo);
    }
    return acc;
  }, []);
  const yamls: string[] = screens.map((screen) => buildScreenInfoYaml(screen));
  return yamls.join('\n\n') + '\n';
};

// https://stackoverflow.com/q/34045777
const copyScreenDataAsYaml = function copyScreenDataAsYamlToClipboard(screenFormData: ScreenFormProps[]): void {
  const textareaElement: HTMLTextAreaElement | null = document.createElement('textarea');
  if (!textareaElement) {
    return;
  }

  textareaElement.contentEditable = 'true';
  textareaElement.readOnly = false;
  textareaElement.value = getWholeYaml(screenFormData);
  document.body.appendChild(textareaElement);

  const range: Range = document.createRange();
  range.selectNodeContents(textareaElement);

  const selection: Selection | null = window.getSelection();
  if (!selection) {
    return;
  }
  selection.removeAllRanges();
  selection.addRange(range);

  textareaElement.select();
  textareaElement.setSelectionRange(0, textareaElement.value.length);

  document.execCommand('copy');
  textareaElement.blur();

  document.body.removeChild(textareaElement);
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
    width: '1920',
    height: '1080',
    diagonal: '24',
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

  const handleCopyClick = function handleCopyAsYamlClick(): void {
    copyScreenDataAsYaml(screenIdOrder.map((id) => screenData[id]));
  };

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    addNewScreenForm(
      { screenData, setScreenData, screenIdOrder, setScreenIdOrder, nextId, setNextId }
    );
  };

  const handleScreenFormChange = function handleScreenFormChangeById(
    id: number,
    propName: ScreenFormPropName,
    propValue: string,
  ): void {
    const nextScreenFormProps: ScreenFormProps = { ...screenData[id], [propName]: propValue };
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
            Copy
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
            Add
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
