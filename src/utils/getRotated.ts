import { PixelCount, RectSize, ScreenInfo } from './ScreenInfo';

export const getRotated = function getRotatedScreenInfo(screenInfo: ScreenInfo): ScreenInfo {
  const pixelCount: PixelCount = {
    width: screenInfo.pixelCount.height,
    height: screenInfo.pixelCount.width,
    total: screenInfo.pixelCount.total,
  };

  const size: RectSize = {
    width: screenInfo.size.height,
    height: screenInfo.size.width,
  };

  const ratio: number = 1 / screenInfo.ratio;

  const rotated: ScreenInfo = { ...screenInfo, pixelCount, size, ratio };

  return rotated;
};

export default getRotated;
