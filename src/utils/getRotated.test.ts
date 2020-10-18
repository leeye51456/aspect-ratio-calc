import getRotated from './getRotated';
import { getScreenInfo, ScreenInfoWithDiagonal } from './ScreenInfo';

test('utils/getRotated: Rotated screen', () => {
  const screenInfos: ScreenInfoWithDiagonal[] = [
    getScreenInfo(1366, 768, 15.6) as ScreenInfoWithDiagonal,
    getScreenInfo(1080, 1920, 5.5) as ScreenInfoWithDiagonal,
    getScreenInfo(2560, 1440, 32) as ScreenInfoWithDiagonal,
    getScreenInfo(3840, 2160, 43) as ScreenInfoWithDiagonal,
    getScreenInfo(5120, 2880, 27) as ScreenInfoWithDiagonal,
    getScreenInfo(3000, 2000, 13.5) as ScreenInfoWithDiagonal,
    getScreenInfo(2048, 1536, 9.7) as ScreenInfoWithDiagonal,
    getScreenInfo(1280, 1024, 19) as ScreenInfoWithDiagonal,
    getScreenInfo(2880, 1800, 15.4) as ScreenInfoWithDiagonal,
    getScreenInfo(2960, 1440, 5.8) as ScreenInfoWithDiagonal,
    getScreenInfo(3040, 1440, 6.1) as ScreenInfoWithDiagonal,
    getScreenInfo(2436, 1125, 5.8) as ScreenInfoWithDiagonal,
    getScreenInfo(3200, 1440, 6.2) as ScreenInfoWithDiagonal,
    getScreenInfo(2560, 1080, 25) as ScreenInfoWithDiagonal,
  ];

  for (const screenInfo of screenInfos) {
    const original: ScreenInfoWithDiagonal = {
      ...screenInfo,
      pixelCount: { ...screenInfo.pixelCount },
      size: { ...screenInfo.size },
    };
    const rotated: ScreenInfoWithDiagonal = getRotated(screenInfo) as ScreenInfoWithDiagonal;

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
});
