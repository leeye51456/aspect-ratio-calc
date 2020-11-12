export const toFixedWithoutTrailingZero = function toFixedWithoutTrailingZero(value: number, length: number): string {
  const integerPart: number = Math.floor(value);
  if (integerPart === value) {
    return value.toString();
  }

  const integerLength: number = integerPart.toString().length;
  const mantissaLength: number = length - integerLength - 1;
  return value.toFixed(mantissaLength).replace(/\.?0+$/, '');
};

export const insertCommas = function insertCommasIntoIneger(integer: number): string {
  return integer.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export const tryParsePositiveFloat = function parseOrFilterPositiveFloat(value?: string | number): number | null {
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
