import React, { useState } from 'react';
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

interface IndexById {
  [id: number]: number,
}

interface AddNewScreenFormParam {
  screenData: ScreenFormData,
  setScreenData: ReactSetState<ScreenFormData>,
  screenIdOrder: number[],
  setScreenIdOrder: ReactSetState<number[]>,
  indexById: IndexById,
  setIndexById: ReactSetState<IndexById>,
  nextId: number,
  setNextId: ReactSetState<number>,
}

const addNewScreenForm = function addNewScreenFormToApp(
  {
    screenData,
    setScreenData,
    screenIdOrder,
    setScreenIdOrder,
    indexById,
    setIndexById,
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

  const nextIndexById: IndexById = { ...indexById, [id]: screenIdOrder.length };
  setIndexById(nextIndexById);

  const nextScreenIdOrder: number[] = [ ...screenIdOrder, id ];
  setScreenIdOrder(nextScreenIdOrder);
};

function App() {
  const [ screenData, setScreenData ] = useState<ScreenFormData>({});
  const [ screenIdOrder, setScreenIdOrder ] = useState<number[]>([]);
  const [ indexById, setIndexById ] = useState<IndexById>({});
  const [ nextId, setNextId ] = useState(0);

  const handleAddClick = function handleAddNewScreenFormClick(): void {
    addNewScreenForm(
      { screenData, setScreenData, screenIdOrder, setScreenIdOrder, indexById, setIndexById, nextId, setNextId }
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

    const nextIndexById: IndexById = { ...indexById };
    delete nextIndexById[id];
    setIndexById(nextIndexById);
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
