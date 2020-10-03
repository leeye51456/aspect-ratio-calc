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
  width: number,
  height: number,
  diagonal: number,
) : ScreenInfo {
  if (width <= 0 || height <= 0 || diagonal <= 0) {
    throw new RangeError('Parameters should be positive numbers.');
  }
  if (!Number.isSafeInteger(width) || !Number.isSafeInteger(height)) {
    throw new RangeError('`width` and `height` should be safe integers.');
  }

  const pixelCount: PixelCount = {
    width,
    height,
    total: width * height,
  };
  const ratio: number = width / height;
  const dpi: number = Math.sqrt(width ** 2 + height ** 2) / diagonal;
  const dotPitch: number = 10 * INCH_TO_CENTIMETER_FACTOR / dpi;
  const size: RectSize = {
    width: width * dotPitch / 10,
    height: height * dotPitch / 10,
  };

  return { pixelCount, ratio, diagonal, dpi, dotPitch, size };
};

export default getScreenInfo;
