const MULTIPLIED_BY_9: { [key: string]: number } = {
  '3:2': 13.5,
  '4:3': 12,
  '5:3': 15,
  '5:4': 11.25,
  '16:10': 14.4,
  '17:10': 15.3,
};

export const getAspectRatioString = function getAspectRatioStringFromNumber(ratio: number): string {
  if (ratio <= 0) {
    throw new RangeError('`ratio` should be a positive number.');
  }

  if (ratio === 1) {
    return '1:1';
  }

  if (ratio < 1) {
    return getAspectRatioStringFromNumber(1 / ratio).split(':').reverse().join(':');
  }

  const ratio9: number = ratio * 9;
  for (const ratioString of Object.keys(MULTIPLIED_BY_9)) {
    if (Math.abs(MULTIPLIED_BY_9[ratioString] - ratio9) <= 0.0078125) { // `0.0078125` is `2 ** -7`
      return ratioString;
    }
  }

  return `${Math.round(ratio9 * 10) / 10}:9`;
};

export default getAspectRatioString;
