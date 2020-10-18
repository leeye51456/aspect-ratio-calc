export interface PixelCount {
  width: number,
  height: number,
  total: number,
};

export interface RectSize {
  width: number,
  height: number,
};

export interface ScreenInfoBase {
  pixelCount: PixelCount,
  ratio: number,
};

export interface ScreenInfoWithDiagonal extends ScreenInfoBase {
  diagonal: number,
  dpi: number,
  dotPitch: number,
  size: RectSize,
};

export type ScreenInfo = ScreenInfoWithDiagonal | ScreenInfoBase;

const INCH_TO_CENTIMETER_FACTOR: number = 2.54;

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

  let floatDiagonal: number | null = null;
  if (typeof diagonal === 'number') {
    if (isFinite(diagonal) && diagonal > 0) {
      floatDiagonal = diagonal;
    }
  } else if (typeof diagonal === 'string') {
    const parsed = parseFloat(diagonal);
    if (isFinite(parsed) && parsed > 0) {
      floatDiagonal = parsed;
    }
  }

  const pixelCount: PixelCount = {
    width: integerWidth,
    height: integerHeight,
    total: integerWidth * integerHeight,
  };
  const ratio: number = integerWidth / integerHeight;

  if (floatDiagonal) {
    const dpi: number = Math.sqrt(integerWidth ** 2 + integerHeight ** 2) / floatDiagonal;
    const dotPitch: number = 10 * INCH_TO_CENTIMETER_FACTOR / dpi;
    const size: RectSize = {
      width: integerWidth * dotPitch / 10,
      height: integerHeight * dotPitch / 10,
    };
    return { pixelCount, ratio, dpi, dotPitch, size, diagonal: floatDiagonal };
  }

  return { pixelCount, ratio };
};

export const isScreenInfoWithDiagonal = function isScreenInfoWithDiagonalInterface(
  obj: ScreenInfo | null
): obj is ScreenInfoWithDiagonal {
  return obj !== null && (obj as ScreenInfoWithDiagonal).diagonal !== undefined;
};

export const isScreenInfoBase = function isScreenInfoInterface(
  obj: ScreenInfo | null
): obj is ScreenInfoBase {
  return obj !== null && (obj as ScreenInfoBase).ratio !== undefined;
};
