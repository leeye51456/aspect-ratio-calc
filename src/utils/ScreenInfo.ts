import getAspectRatioString from './getAspectRatioString';

export interface PixelCount {
  readonly width: number,
  readonly height: number,
  readonly total: number,
};

export interface RectSize {
  readonly width: number,
  readonly height: number,
};

const INCH_TO_CENTIMETER_FACTOR: number = 2.54;

export const toInches = function convertCentimetersToInches(centimeters: number): number {
  return centimeters / INCH_TO_CENTIMETER_FACTOR;
};

export const toCentimeters = function convertInchesToCentimeters(inches: number): number {
  return inches * INCH_TO_CENTIMETER_FACTOR;
};

export class ScreenInfoBase {
  protected map: Map<string, string> | null;

  readonly pixelCount: PixelCount;
  readonly ratio: number;

  constructor(width: number, height: number) {
    const integerWidth: number = Math.floor(width);
    const integerHeight: number = Math.floor(height);

    this.pixelCount = {
      width: integerWidth,
      height: integerHeight,
      total: integerWidth * integerHeight,
    };
    this.ratio = integerWidth / integerHeight;
    this.map = null;
  }

  toMap = (): Map<string, string> => {
    if (this.map) {
      return this.map;
    }

    const { pixelCount, ratio }: ScreenInfoBase = this;
    const newMap = new Map();
    newMap.set('Screen', `${pixelCount.width} x ${pixelCount.height}`);
    newMap.set('AspectRatio', `${ratio.toFixed(2)}:1 (${getAspectRatioString(ratio)})`);
    newMap.set('PixelCount', `${pixelCount.total}`);
    this.map = newMap;

    return newMap;
  }

  toYaml = (): string => {
    const map = this.toMap();
    return Array.from(map.keys())
      .map((key) => `${key}: ${map.get(key)}`)
      .join('\n');
  };
};

export class ScreenInfoWithDiagonal extends ScreenInfoBase {
  readonly diagonal: number;
  readonly dpi: number;
  readonly dotPitch: number;
  readonly size: RectSize;

  constructor(width: number, height: number, diagonal: number) {
    super(width, height);

    this.diagonal = diagonal;
    this.dpi = Math.sqrt(this.pixelCount.width ** 2 + this.pixelCount.height ** 2) / diagonal;
    this.dotPitch = 10 * toCentimeters(1 / this.dpi);
    this.size = {
      width: this.pixelCount.width * this.dotPitch / 10,
      height: this.pixelCount.height * this.dotPitch / 10,
    };
  }

  toMap = (): Map<string, string> => {
    if (this.map) {
      return this.map;
    }

    const { pixelCount, diagonal, ratio, dpi, dotPitch, size }: ScreenInfoWithDiagonal = this;
    const newMap = new Map();
    newMap.set('Screen', `${pixelCount.width} x ${pixelCount.height}`);
    newMap.set('Diagonal', `${diagonal}"`);
    newMap.set('AspectRatio', `${ratio.toFixed(2)}:1 (${getAspectRatioString(ratio)})`);
    newMap.set('DPI', `${dpi.toFixed(2)}`);
    newMap.set('DotPitch', `${dotPitch.toFixed(4)}`);
    newMap.set('Size', `${size.width.toFixed(2)} cm x ${size.height.toFixed(2)} cm`);
    newMap.set('PixelCount', `${pixelCount.total}`);
    this.map = newMap;

    return newMap;
  }
};

export const tryParsePositiveFloat = function parsePositiveFloatOrGetNull(value?: string | number): number | null {
  if (typeof value === 'number') {
    if (isFinite(value) && value > 0) {
      return value;
    }
  } else if (typeof value === 'string') {
    const parsed = parseFloat(value);
    if (isFinite(parsed) && parsed > 0) {
      return parsed;
    }
  }
  return null;
};

export const getScreenInfo = function getScreenInfoFrom(
  width: number | string,
  height: number | string,
  diagonal?: number | string,
) : ScreenInfo | null {
  const integerWidth: number = typeof width === 'number' ? Math.floor(width) : parseInt(width, 10);
  const integerHeight: number = typeof height === 'number' ? Math.floor(height) : parseInt(height, 10);
  if ([integerWidth, integerHeight].some(isNaN)) {
    return null;
  }
  if ([integerWidth, integerHeight].some((value) => value <= 0)) {
    return null;
  }
  if (![integerWidth, integerHeight].every(Number.isSafeInteger)) {
    return null;
  }

  let floatDiagonal: number | null = tryParsePositiveFloat(diagonal);

  if (floatDiagonal === null) {
    return new ScreenInfoBase(integerWidth, integerHeight);
  }
  return new ScreenInfoWithDiagonal(integerWidth, integerHeight, floatDiagonal);
};

export type ScreenInfo = ScreenInfoWithDiagonal | ScreenInfoBase;
