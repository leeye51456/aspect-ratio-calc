export interface PixelCount {
  width: number,
  height: number,
  total: number,
};

export interface RectSize {
  width: number,
  height: number,
};

export interface ScreenInfo {
  pixelCount: PixelCount,
  ratio: number,
  diagonal: number,
  dpi: number,
  dotPitch: number,
  size: RectSize,
};

const INCH_TO_CENTIMETER_FACTOR: number = 2.54;

export const getScreenInfo = function getScreenInfoFrom(
  width: number | string,
  height: number | string,
  diagonal: number | string,
) : ScreenInfo | null {
  const integerWidth: number = typeof width === 'number' ? Math.floor(width) : parseInt(width, 10);
  const integerHeight: number = typeof height === 'number' ? Math.floor(height) : parseInt(height, 10);
  const floatDiagonal: number = typeof diagonal === 'number' ? diagonal : parseFloat(diagonal);
  if ([integerWidth, integerHeight, floatDiagonal].some(isNaN)) {
    return null;
  }
  if ([integerWidth, integerHeight, floatDiagonal].some((value) => value <= 0)) {
    return null;
  }
  if (![integerWidth, integerHeight].every(Number.isSafeInteger)) {
    return null;
  }

  const pixelCount: PixelCount = {
    width: integerWidth,
    height: integerHeight,
    total: integerWidth * integerHeight,
  };
  const ratio: number = integerWidth / integerHeight;
  const dpi: number = Math.sqrt(integerWidth ** 2 + integerHeight ** 2) / floatDiagonal;
  const dotPitch: number = 10 * INCH_TO_CENTIMETER_FACTOR / dpi;
  const size: RectSize = {
    width: integerWidth * dotPitch / 10,
    height: integerHeight * dotPitch / 10,
  };

  return { pixelCount, ratio, dpi, dotPitch, size, diagonal: floatDiagonal };
};

export default getScreenInfo;
