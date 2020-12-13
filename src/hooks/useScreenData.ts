import { useState } from 'react';
import { AvailableUnit } from '../utils/ScreenInfo';

export interface StoredScreenFormProps {
  readonly id: number,
  readonly width: string,
  readonly height: string,
  readonly diagonal: string,
  readonly diagonalUnit: AvailableUnit,
  readonly sizeUnit: AvailableUnit,
};

export interface NewScreenFormProps {
  readonly width?: string,
  readonly height?: string,
  readonly diagonal?: string,
  readonly diagonalUnit: AvailableUnit,
  readonly sizeUnit: AvailableUnit,
};

export interface UpdatedScreenFormProps {
  readonly width?: string,
  readonly height?: string,
  readonly diagonal?: string,
  readonly diagonalUnit?: AvailableUnit,
  readonly sizeUnit?: AvailableUnit,
};

export interface ScreenFormData {
  [id: number]: StoredScreenFormProps,
};

const defaults: { data: ScreenFormData, idOrder: number[], nextId: number } = (function getDefaults() {
  const { devicePixelRatio = 1, screen: { width, height } }: Window = window;

  const data: ScreenFormData = {
    0: {
      id: 0,
      width: (width * devicePixelRatio).toString(),
      height: (height * devicePixelRatio).toString(),
      diagonal: '',
      diagonalUnit: 'in',
      sizeUnit: 'cm',
    },
  };

  return {
    data,
    idOrder: [0],
    nextId: 1,
  };
})();

// TODO - Move unit hooks and unit conversion here.
function useScreenData() {
  const [ data, setData ] = useState<ScreenFormData>(defaults.data);
  const [ idOrder, setIdOrder ] = useState<number[]>(defaults.idOrder);
  const [ nextId, setNextId ] = useState<number>(defaults.nextId);

  const add = function addScreen(screenFormProps: NewScreenFormProps): void {
    const id = nextId;
    setNextId(nextId + 1);

    const newScreenFormProps: StoredScreenFormProps = {
      id,
      width: '',
      height: '',
      diagonal: '',
      ...screenFormProps,
    };

    const nextData: ScreenFormData = {
      ...data,
      [id]: newScreenFormProps,
    };
    setData(nextData);

    const nextIdOrder: number[] = [ ...idOrder, id ];
    setIdOrder(nextIdOrder);
  };

  const update = function updateScreenById(id: number, screenFormProps: UpdatedScreenFormProps): void {
    if (id >= nextId) {
      return; // invalid id
    }

    const nextScreenFormProps: StoredScreenFormProps = {
      ...data[id],
      ...screenFormProps,
    };
    const nextData: ScreenFormData = {
      ...data,
      [id]: nextScreenFormProps,
    };
    setData(nextData);
  };

  // TODO - Remove this function after moving unit hooks and unit conversion here.
  const replace = function replaceData(newData: ScreenFormData): void {
    if (Object.keys(newData).length === Object.keys(data).length) {
      setData(newData);
    }
  };

  const remove = function removeScreenById(id: number): void {
    const nextData: ScreenFormData = { ...data };
    delete nextData[id];
    setData(nextData);

    const nextIdOrder: number[] = idOrder.filter((value) => value !== id);
    setIdOrder(nextIdOrder);
  };

  return {
    data,
    idOrder,
    add,
    update,
    replace,
    remove,
  };
}

export default useScreenData;
