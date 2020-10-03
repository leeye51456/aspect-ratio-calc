import getRotated from './getRotated';
import { getScreenInfo, ScreenInfo } from './getScreenInfo';

const testGetRotated = function testGetRotatedFunctionWith(screenInfo: ScreenInfo): void {
  const original: ScreenInfo = {
    ...screenInfo,
    pixelCount: { ...screenInfo.pixelCount },
    size: { ...screenInfo.size },
  };
  const rotated: ScreenInfo = getRotated(screenInfo);

  expect(original).toEqual(screenInfo);

  expect(rotated.diagonal).toBeCloseTo(screenInfo.diagonal);
  expect(rotated.dotPitch).toBeCloseTo(screenInfo.dotPitch);
  expect(rotated.dpi).toBeCloseTo(screenInfo.dpi);
  expect(rotated.pixelCount.width).toBeCloseTo(screenInfo.pixelCount.height);
  expect(rotated.pixelCount.height).toBeCloseTo(screenInfo.pixelCount.width);
  expect(rotated.pixelCount.total).toBeCloseTo(screenInfo.pixelCount.total);
  expect(rotated.ratio).toBeCloseTo(1 / screenInfo.ratio);
  expect(rotated.size.width).toBeCloseTo(screenInfo.size.height);
  expect(rotated.size.height).toBeCloseTo(screenInfo.size.width);
}

test('utils/getRotated: Rotated screen', () => {
  const screenInfos: ScreenInfo[] = [
    getScreenInfo(1366, 768, 15.6),
    getScreenInfo(1080, 1920, 5.5),
    getScreenInfo(2560, 1440, 32),
    getScreenInfo(3840, 2160, 43),
    getScreenInfo(5120, 2880, 27),
    getScreenInfo(3000, 2000, 13.5),
    getScreenInfo(2048, 1536, 9.7),
    getScreenInfo(1280, 1024, 19),
    getScreenInfo(2880, 1800, 15.4),
    getScreenInfo(2960, 1440, 5.8),
    getScreenInfo(3040, 1440, 6.1),
    getScreenInfo(2436, 1125, 5.8),
    getScreenInfo(3200, 1440, 6.2),
    getScreenInfo(2560, 1080, 25),
  ];
  for (const screenInfo of screenInfos) {
    testGetRotated(screenInfo);
  }
});
