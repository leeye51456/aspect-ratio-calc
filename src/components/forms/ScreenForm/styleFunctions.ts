const maxWidth: number = 360;

export const getContainerStyle = function getContainerStyleByRatio(ratio: number): { width: string } {
  if (ratio < 9 / 22) {
    return { width: `${100 * 9 / 22}%` }; // If ratio < 9:22, fix ratio 9:22
  } else if (ratio < 1) {
    return { width: `${100 * ratio}%` }; // If 9:22 <= ratio < 1, use width = ratio
  } else {
    return { width: '100%' }; // If ratio >= 1, use width = 100%
  }
};

export const getRatioStyle = function getRatioStyleByRatio(ratio: number): { paddingBottom: string } {
  if (ratio > 22 / 9) {
    return { paddingBottom: `${100 * 9 / 22}%` }; // If ratio > 22:9, fix ratio 22:9
  } else if (ratio < 9 / 22) {
    return { paddingBottom: `${100 * 22 / 9}%` }; // If ratio < 9:22, use ratio 9:22
  } else {
    return { paddingBottom: `${100 / ratio}%` }; // If 9:22 <= ratio <= 22:9, use 1 / ratio
  }
};

export const getFormWidth = function getFormWidthByPixels(ratio: number): number {
  if (ratio < 9 / 22) {
    return maxWidth * 9 / 22; // ratio < 9:22
  } else if (ratio < 1) {
    return maxWidth * ratio; // 9:22 <= ratio < 1
  } else {
    return maxWidth; // ratio >= 1
  }
};

export const getFormHeight = function getFormHeightByPixels(ratio: number): number {
  if (ratio > 22 / 9) {
    return maxWidth * 9 / 22; // ratio > 22:9
  } else if (ratio <= 1) {
    return maxWidth; // ratio <= 1
  } else {
    return maxWidth / ratio; // 1 < ratio <= 22:9
  }
};
