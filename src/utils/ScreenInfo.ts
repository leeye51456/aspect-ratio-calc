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

export class ScreenInfoBase {
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
  }
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
    this.dotPitch = 10 * INCH_TO_CENTIMETER_FACTOR / this.dpi;
    this.size = {
      width: this.pixelCount.width * this.dotPitch / 10,
      height: this.pixelCount.height * this.dotPitch / 10,
    };
  }
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

  if (floatDiagonal === null) {
    return new ScreenInfoBase(integerWidth, integerHeight);
  }
  return new ScreenInfoWithDiagonal(integerWidth, integerHeight, floatDiagonal);
};

export type ScreenInfo = ScreenInfoWithDiagonal | ScreenInfoBase;
