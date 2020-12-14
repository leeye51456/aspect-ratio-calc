import { useState } from 'react';
import { toFixedWithoutTrailingZero, tryParsePositiveFloat } from '../utils/number';
import { AvailableUnit, toCentimeters, toInches } from '../utils/ScreenInfo';

export interface StoredScreenFormProps {
  readonly id: number,
  readonly width: string,
  readonly height: string,
  readonly diagonal: string,
};

export interface NewScreenFormProps {
  readonly width?: string,
  readonly height?: string,
  readonly diagonal?: string,
};

export interface UpdatedScreenFormProps {
  readonly width?: string,
  readonly height?: string,
  readonly diagonal?: string,
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
    },
  };

  return {
    data,
    idOrder: [0],
    nextId: 1,
  };
})();

function useScreenData() {
  const [ data, setData ] = useState<ScreenFormData>(defaults.data);
  const [ idOrder, setIdOrder ] = useState<number[]>(defaults.idOrder);
  const [ nextId, setNextId ] = useState<number>(defaults.nextId);

  const [ diagonalUnit, setDiagonalUnit ] = useState<AvailableUnit>('in');
  const [ sizeUnit, setSizeUnit ] = useState<AvailableUnit>('cm');

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

  const remove = function removeScreenById(id: number): void {
    const nextData: ScreenFormData = { ...data };
    delete nextData[id];
    setData(nextData);

    const nextIdOrder: number[] = idOrder.filter((value) => value !== id);
    setIdOrder(nextIdOrder);
  };

  const changeDiagonalUnit = function changeDiagonalUnitTo(nextUnit: AvailableUnit): void {
    const nextScreenData: ScreenFormData = {};

    for (const id of idOrder) {
      const parsedDiagonal: number | null = tryParsePositiveFloat(data[id]?.diagonal);
      if (typeof parsedDiagonal === 'number') {
        nextScreenData[id] = {
          ...data[id],
          diagonal: nextUnit === 'in'
            ? toFixedWithoutTrailingZero(toInches(parsedDiagonal), 6)
            : toFixedWithoutTrailingZero(toCentimeters(parsedDiagonal), 6),
        };
      } else {
        nextScreenData[id] = data[id];
      }
    }

    setData(nextScreenData);
    setDiagonalUnit(nextUnit);
  };

  const changeUnits = function changeUnitsTo(
    { diagonal, size }: { diagonal?: AvailableUnit, size?: AvailableUnit }
  ): void {
    if (diagonal && diagonal !== diagonalUnit) {
      changeDiagonalUnit(diagonal);
    }
    if (size && size !== sizeUnit) {
      setSizeUnit(size);
    }
  };

  return {
    data,
    idOrder,
    add,
    update,
    remove,
    units: {
      diagonal: diagonalUnit,
      size: sizeUnit,
      change: changeUnits,
    },
  };
}

export default useScreenData;
