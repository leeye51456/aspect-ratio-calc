import { ScreenInfo, getScreenInfo } from './getScreenInfo';

test('utils/getScreenInfo: Invalid parameter', () => {
  const passZeroWidth: ScreenInfo | null = getScreenInfo(0, 1, 1);
  const passZeroHeight: ScreenInfo | null = getScreenInfo(1, 0, 1);
  const passZeroDiagonal: ScreenInfo | null = getScreenInfo(1, 1, 0);
  expect(passZeroWidth).toBeNull();
  expect(passZeroHeight).toBeNull();
  expect(passZeroDiagonal).toBeNull();

  const passNegativeWidth: ScreenInfo | null = getScreenInfo(-1, 1, 1);
  const passNegativeHeight: ScreenInfo | null = getScreenInfo(1, -1, 1);
  const passNegativeDiagonal: ScreenInfo | null = getScreenInfo(1, 1, -1);
  expect(passNegativeWidth).toBeNull();
  expect(passNegativeHeight).toBeNull();
  expect(passNegativeDiagonal).toBeNull();

  const UNSAFE_INTEGER: number = Number.MAX_SAFE_INTEGER + 1;
  const passUnsafeIntegerWidth: ScreenInfo | null = getScreenInfo(UNSAFE_INTEGER, 1, 1);
  const passUnsafeIntegerHeight: ScreenInfo | null = getScreenInfo(1, UNSAFE_INTEGER, 1);
  expect(passUnsafeIntegerWidth).toBeNull();
  expect(passUnsafeIntegerHeight).toBeNull();

  const passNaNWidth: ScreenInfo | null = getScreenInfo(NaN, 1, 1);
  const passNaNHeight: ScreenInfo | null = getScreenInfo(1, NaN, 1);
  const passNaNDiagonal: ScreenInfo | null = getScreenInfo(1, 1, NaN);
  expect(passNaNWidth).toBeNull();
  expect(passNaNHeight).toBeNull();
  expect(passNaNDiagonal).toBeNull();
});

test('utils/getScreenInfo: Preserve original values', () => {
  const integerDiagonal: ScreenInfo | null = getScreenInfo(1920, 1080, 24);
  expect(integerDiagonal).not.toBeNull();
  expect(integerDiagonal?.pixelCount.width).toBe(1920);
  expect(integerDiagonal?.pixelCount.height).toBe(1080);
  expect(integerDiagonal?.diagonal).toBe(24);

  // `15.3 + 0.3` is `15.600000000000001`
  const floatDiagonal: ScreenInfo | null = getScreenInfo(1366, 768, 15.3 + 0.3);
  expect(floatDiagonal).not.toBeNull();
  expect(floatDiagonal?.pixelCount.width).toBe(1366);
  expect(floatDiagonal?.pixelCount.height).toBe(768);
  expect(floatDiagonal?.diagonal).toBeCloseTo(15.6, 8);
});

test('utils/getScreenInfo: Round down float width and height', () => {
  const floatWidth: ScreenInfo | null = getScreenInfo(1365.3333, 768, 15.6);
  expect(floatWidth).not.toBeNull();
  expect(floatWidth?.pixelCount.width).toBe(1365);
  expect(floatWidth?.pixelCount.height).toBe(768);
  expect(floatWidth?.diagonal).toBe(15.6);

  const floatHeight: ScreenInfo | null = getScreenInfo(2436, 1124.30769, 5.8);
  expect(floatHeight).not.toBeNull();
  expect(floatHeight?.pixelCount.width).toBe(2436);
  expect(floatHeight?.pixelCount.height).toBe(1124);
  expect(floatHeight?.diagonal).toBe(5.8);
});

test('utils/getScreenInfo: Calculate DPI, dot pitch, screen size, and pixel count', () => {
  const fwxga15_6: ScreenInfo | null = getScreenInfo(1366, 768, 15.6);
  expect(fwxga15_6).not.toBeNull();
  expect(fwxga15_6?.dpi).toBeCloseTo(100.45, 2);
  expect(fwxga15_6?.dotPitch).toBeCloseTo(0.2529, 4);
  expect(fwxga15_6?.size.width).toBeCloseTo(34.54, 2);
  expect(fwxga15_6?.size.height).toBeCloseTo(19.42, 2);
  expect(fwxga15_6?.pixelCount.total).toBe(1_049_088);

  const fhd5_5: ScreenInfo | null = getScreenInfo(1080, 1920, 5.5);
  expect(fhd5_5).not.toBeNull();
  expect(fhd5_5?.dpi).toBeCloseTo(400.53, 2);
  expect(fhd5_5?.dotPitch).toBeCloseTo(0.0634, 4);
  expect(fhd5_5?.size.width).toBeCloseTo(6.85, 2);
  expect(fhd5_5?.size.height).toBeCloseTo(12.18, 2);
  expect(fhd5_5?.pixelCount.total).toBe(2_073_600);

  const qhd32: ScreenInfo | null = getScreenInfo(2560, 1440, 32);
  expect(qhd32).not.toBeNull();
  expect(qhd32?.dpi).toBeCloseTo(91.79, 2);
  expect(qhd32?.dotPitch).toBeCloseTo(0.2767, 4);
  expect(qhd32?.size.width).toBeCloseTo(70.84, 2);
  expect(qhd32?.size.height).toBeCloseTo(39.85, 2);
  expect(qhd32?.pixelCount.total).toBe(3_686_400);

  const uhd43: ScreenInfo | null = getScreenInfo(3840, 2160, 43);
  expect(uhd43).not.toBeNull();
  expect(uhd43?.dpi).toBeCloseTo(102.46, 2);
  expect(uhd43?.dotPitch).toBeCloseTo(0.2479, 4);
  expect(uhd43?.size.width).toBeCloseTo(95.19, 2);
  expect(uhd43?.size.height).toBeCloseTo(53.55, 2);
  expect(uhd43?.pixelCount.total).toBe(8_294_400);

  const fiveK27: ScreenInfo | null = getScreenInfo(5120, 2880, 27);
  expect(fiveK27).not.toBeNull();
  expect(fiveK27?.dpi).toBeCloseTo(217.57, 2);
  expect(fiveK27?.dotPitch).toBeCloseTo(0.1167, 4);
  expect(fiveK27?.size.width).toBeCloseTo(59.77, 2);
  expect(fiveK27?.size.height).toBeCloseTo(33.62, 2);
  expect(fiveK27?.pixelCount.total).toBe(14_745_600);
});

test('utils/getScreenInfo: Calculate aspect ratio', () => {
  const fwxga: ScreenInfo | null = getScreenInfo(1366, 768, 1);
  expect(fwxga).not.toBeNull();
  expect(fwxga?.ratio).toBeCloseTo(1.778645833333333, 8);

  const ratio4_3: ScreenInfo | null = getScreenInfo(1024, 768, 1);
  expect(ratio4_3).not.toBeNull();
  expect(ratio4_3?.ratio).toBeCloseTo(1.333333333333333, 8);

  const ratio5_4: ScreenInfo | null = getScreenInfo(1280, 1024, 1);
  expect(ratio5_4).not.toBeNull();
  expect(ratio5_4?.ratio).toBeCloseTo(1.25, 8);

  const ratio16_9: ScreenInfo | null = getScreenInfo(1920, 1080, 1);
  expect(ratio16_9).not.toBeNull();
  expect(ratio16_9?.ratio).toBeCloseTo(1.777777777777777, 8);

  const ratio16_10: ScreenInfo | null = getScreenInfo(1920, 1200, 1);
  expect(ratio16_10).not.toBeNull();
  expect(ratio16_10?.ratio).toBeCloseTo(1.6, 8);

  const ratio185_9: ScreenInfo | null = getScreenInfo(2960, 1440, 1);
  expect(ratio185_9).not.toBeNull();
  expect(ratio185_9?.ratio).toBeCloseTo(2.055555555555555, 8);

  const ratio19_9: ScreenInfo | null = getScreenInfo(3040, 1440, 1);
  expect(ratio19_9).not.toBeNull();
  expect(ratio19_9?.ratio).toBeCloseTo(2.11111111111111, 8);

  const ratio195_9: ScreenInfo | null = getScreenInfo(2436, 1125, 1);
  expect(ratio195_9).not.toBeNull();
  expect(ratio195_9?.ratio).toBeCloseTo(2.165333333333333, 8);

  const ratio20_9: ScreenInfo | null = getScreenInfo(3200, 1440, 1);
  expect(ratio20_9).not.toBeNull();
  expect(ratio20_9?.ratio).toBeCloseTo(2.222222222222222, 8);

  const ratio21_9: ScreenInfo | null = getScreenInfo(2560, 1080, 1);
  expect(ratio21_9).not.toBeNull();
  expect(ratio21_9?.ratio).toBeCloseTo(2.370370370370370, 8);
});
