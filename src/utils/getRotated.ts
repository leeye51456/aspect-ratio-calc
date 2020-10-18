import { getScreenInfo, isScreenInfoWithDiagonal, ScreenInfo } from './ScreenInfo';

// TODO - Remove this function?
export const getRotated = function getRotatedScreenInfo(screenInfo: ScreenInfo): ScreenInfo | null {
  const { width, height }: { width: number, height: number } = screenInfo.pixelCount;
  if (isScreenInfoWithDiagonal(screenInfo)) {
    return getScreenInfo(height, width, screenInfo.diagonal);
  }
  return getScreenInfo(height, width);
};

export default getRotated;
