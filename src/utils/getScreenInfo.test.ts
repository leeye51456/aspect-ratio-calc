import { ScreenInfo, getScreenInfo } from './getScreenInfo';

test('utils/getScreenInfo: Invalid parameter', () => {
  const passZeroWidth = () => getScreenInfo(0, 1, 1);
  const passZeroHeight = () => getScreenInfo(1, 0, 1);
  const passZeroDiagonal = () => getScreenInfo(1, 1, 0);
  expect(passZeroWidth).toThrow(RangeError);
  expect(passZeroHeight).toThrow(RangeError);
  expect(passZeroDiagonal).toThrow(RangeError);
  expect(passZeroWidth).toThrow('positive');
  expect(passZeroHeight).toThrow('positive');
  expect(passZeroDiagonal).toThrow('positive');

  const passNegativeWidth = () => getScreenInfo(-1, 1, 1);
  const passNegativeHeight = () => getScreenInfo(1, -1, 1);
  const passNegativeDiagonal = () => getScreenInfo(1, 1, -1);
  expect(passNegativeWidth).toThrow(RangeError);
  expect(passNegativeHeight).toThrow(RangeError);
  expect(passNegativeDiagonal).toThrow(RangeError);
  expect(passNegativeWidth).toThrow('positive');
  expect(passNegativeHeight).toThrow('positive');
  expect(passNegativeDiagonal).toThrow('positive');

  const UNSAFE_INTEGER: number = Number.MAX_SAFE_INTEGER + 1;
  const passUnsafeIntegerWidth = () => getScreenInfo(UNSAFE_INTEGER, 1, 1);
  const passUnsafeIntegerHeight = () => getScreenInfo(1, UNSAFE_INTEGER, 1);
  expect(passUnsafeIntegerWidth).toThrow(RangeError);
  expect(passUnsafeIntegerHeight).toThrow(RangeError);
  expect(passUnsafeIntegerWidth).toThrow('safe integer');
  expect(passUnsafeIntegerHeight).toThrow('safe integer');

  const passFloatWidth = () => getScreenInfo(0.1, 1, 1);
  const passFloatHeight = () => getScreenInfo(1, 0.1, 1);
  expect(passFloatWidth).toThrow(RangeError);
  expect(passFloatHeight).toThrow(RangeError);
  expect(passFloatWidth).toThrow('safe integer');
  expect(passFloatHeight).toThrow('safe integer');
});

test('utils/getScreenInfo: Preserve original values', () => {
  const integerDiagonal: ScreenInfo = getScreenInfo(1920, 1080, 24);
  expect(integerDiagonal.pixelCount.width).toBe(1920);
  expect(integerDiagonal.pixelCount.height).toBe(1080);
  expect(integerDiagonal.diagonal).toBe(24);

  const floatDiagonal: ScreenInfo = getScreenInfo(1366, 768, 15.3 + 0.3); // `15.3 + 0.3` is `15.600000000000001`
  expect(floatDiagonal.pixelCount.width).toBe(1366);
  expect(floatDiagonal.pixelCount.height).toBe(768);
  expect(floatDiagonal.diagonal).toBeCloseTo(15.6, 8);
});

test('utils/getScreenInfo: Calculate DPI, dot pitch, screen size, and pixel count', () => {
  const fwxga15_6: ScreenInfo = getScreenInfo(1366, 768, 15.6);
  expect(fwxga15_6.dpi).toBeCloseTo(100.45, 2);
  expect(fwxga15_6.dotPitch).toBeCloseTo(0.2529, 4);
  expect(fwxga15_6.size.width).toBeCloseTo(34.54, 2);
  expect(fwxga15_6.size.height).toBeCloseTo(19.42, 2);
  expect(fwxga15_6.pixelCount.total).toBe(1_049_088);

  const fhd5_5: ScreenInfo = getScreenInfo(1080, 1920, 5.5);
  expect(fhd5_5.dpi).toBeCloseTo(400.53, 2);
  expect(fhd5_5.dotPitch).toBeCloseTo(0.0634, 4);
  expect(fhd5_5.size.width).toBeCloseTo(6.85, 2);
  expect(fhd5_5.size.height).toBeCloseTo(12.18, 2);
  expect(fhd5_5.pixelCount.total).toBe(2_073_600);

  const qhd32: ScreenInfo = getScreenInfo(2560, 1440, 32);
  expect(qhd32.dpi).toBeCloseTo(91.79, 2);
  expect(qhd32.dotPitch).toBeCloseTo(0.2767, 4);
  expect(qhd32.size.width).toBeCloseTo(70.84, 2);
  expect(qhd32.size.height).toBeCloseTo(39.85, 2);
  expect(qhd32.pixelCount.total).toBe(3_686_400);

  const uhd43: ScreenInfo = getScreenInfo(3840, 2160, 43);
  expect(uhd43.dpi).toBeCloseTo(102.46, 2);
  expect(uhd43.dotPitch).toBeCloseTo(0.2479, 4);
  expect(uhd43.size.width).toBeCloseTo(95.19, 2);
  expect(uhd43.size.height).toBeCloseTo(53.55, 2);
  expect(uhd43.pixelCount.total).toBe(8_294_400);

  const fiveK27: ScreenInfo = getScreenInfo(5120, 2880, 27);
  expect(fiveK27.dpi).toBeCloseTo(217.57, 2);
  expect(fiveK27.dotPitch).toBeCloseTo(0.1167, 4);
  expect(fiveK27.size.width).toBeCloseTo(59.77, 2);
  expect(fiveK27.size.height).toBeCloseTo(33.62, 2);
  expect(fiveK27.pixelCount.total).toBe(14_745_600);
});

test('utils/getScreenInfo: Calculate aspect ratio', () => {
  const fwxga: ScreenInfo = getScreenInfo(1366, 768, 1);
  expect(fwxga.ratio).toBeCloseTo(1.778645833333333, 8);

  const ratio4_3: ScreenInfo = getScreenInfo(1024, 768, 1);
  expect(ratio4_3.ratio).toBeCloseTo(1.333333333333333, 8);

  const ratio5_4: ScreenInfo = getScreenInfo(1280, 1024, 1);
  expect(ratio5_4.ratio).toBeCloseTo(1.25, 8);

  const ratio16_9: ScreenInfo = getScreenInfo(1920, 1080, 1);
  expect(ratio16_9.ratio).toBeCloseTo(1.777777777777777, 8);

  const ratio16_10: ScreenInfo = getScreenInfo(1920, 1200, 1);
  expect(ratio16_10.ratio).toBeCloseTo(1.6, 8);

  const ratio185_9: ScreenInfo = getScreenInfo(2960, 1440, 1);
  expect(ratio185_9.ratio).toBeCloseTo(2.055555555555555, 8);

  const ratio19_9: ScreenInfo = getScreenInfo(3040, 1440, 1);
  expect(ratio19_9.ratio).toBeCloseTo(2.11111111111111, 8);

  const ratio195_9: ScreenInfo = getScreenInfo(2436, 1125, 1);
  expect(ratio195_9.ratio).toBeCloseTo(2.165333333333333, 8);

  const ratio20_9: ScreenInfo = getScreenInfo(3200, 1440, 1);
  expect(ratio20_9.ratio).toBeCloseTo(2.222222222222222, 8);

  const ratio21_9: ScreenInfo = getScreenInfo(2560, 1080, 1);
  expect(ratio21_9.ratio).toBeCloseTo(2.370370370370370, 8);
});
