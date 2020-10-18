import {
  ScreenInfo,
  getScreenInfo,
  ScreenInfoWithDiagonal,
  isScreenInfoWithDiagonal,
  isScreenInfoBase,
  ScreenInfoBase
} from './ScreenInfo';

type Returned = ScreenInfo | null;

test('utils/ScreenInfo: User defined type guard', () => {
  const withDiagonal: ScreenInfoWithDiagonal = {
    pixelCount: { width: 1, height: 1, total: 1 },
    ratio: 1,
    diagonal: 1,
    dpi: 1,
    dotPitch: 1,
    size: { width: 1, height: 1 },
  };
  expect(isScreenInfoWithDiagonal(withDiagonal)).toBe(true);
  expect(isScreenInfoBase(withDiagonal)).toBe(true); // ScreenInfoWithDiagonal extends ScreenInfoBase

  const withoutDiagonal: ScreenInfoBase = {
    pixelCount: { width: 1, height: 1, total: 1 },
    ratio: 1,
  };
  expect(isScreenInfoWithDiagonal(withoutDiagonal)).toBe(false);
  expect(isScreenInfoBase(withoutDiagonal)).toBe(true);
});

test('utils/ScreenInfo: Invalid parameter', () => {
  const passUnparsableWidth: Returned = getScreenInfo('width', 1, 1);
  const passUnparsableHeight: Returned = getScreenInfo(1, 'height', 1);
  const passUnparsableDiagonal: Returned = getScreenInfo(1, 1, 'diagonal');
  expect(passUnparsableWidth).toBeNull();
  expect(passUnparsableHeight).toBeNull();
  expect(isScreenInfoWithDiagonal(passUnparsableDiagonal)).toBe(false);
  expect(isScreenInfoBase(passUnparsableDiagonal)).toBe(true);

  const passZeroWidth: Returned = getScreenInfo(0, 1, 1);
  const passZeroHeight: Returned = getScreenInfo(1, 0, 1);
  const passZeroDiagonal: Returned = getScreenInfo(1, 1, 0);
  expect(passZeroWidth).toBeNull();
  expect(passZeroHeight).toBeNull();
  expect(isScreenInfoWithDiagonal(passZeroDiagonal)).toBe(false);
  expect(isScreenInfoBase(passZeroDiagonal)).toBe(true);

  const passNegativeWidth: Returned = getScreenInfo(-1, 1, 1);
  const passNegativeHeight: Returned = getScreenInfo(1, -1, 1);
  const passNegativeDiagonal: Returned = getScreenInfo(1, 1, -1);
  expect(passNegativeWidth).toBeNull();
  expect(passNegativeHeight).toBeNull();
  expect(isScreenInfoWithDiagonal(passNegativeDiagonal)).toBe(false);
  expect(isScreenInfoBase(passNegativeDiagonal)).toBe(true);

  const UNSAFE_INTEGER: number = Number.MAX_SAFE_INTEGER + 1;
  const passUnsafeIntegerWidth: Returned = getScreenInfo(UNSAFE_INTEGER, 1, 1);
  const passUnsafeIntegerHeight: Returned = getScreenInfo(1, UNSAFE_INTEGER, 1);
  expect(passUnsafeIntegerWidth).toBeNull();
  expect(passUnsafeIntegerHeight).toBeNull();

  const passInfinityWidth: Returned = getScreenInfo(Infinity, 1, 1);
  const passInfinityHeight: Returned = getScreenInfo(1, Infinity, 1);
  const passInfinityDiagonal: Returned = getScreenInfo(1, 1, Infinity);
  expect(passInfinityWidth).toBeNull();
  expect(passInfinityHeight).toBeNull();
  expect(isScreenInfoWithDiagonal(passInfinityDiagonal)).toBe(false);
  expect(isScreenInfoBase(passInfinityDiagonal)).toBe(true);

  const passNaNWidth: Returned = getScreenInfo(NaN, 1, 1);
  const passNaNHeight: Returned = getScreenInfo(1, NaN, 1);
  const passNaNDiagonal: Returned = getScreenInfo(1, 1, NaN);
  expect(passNaNWidth).toBeNull();
  expect(passNaNHeight).toBeNull();
  expect(isScreenInfoWithDiagonal(passNaNDiagonal)).toBe(false);
  expect(isScreenInfoBase(passNaNDiagonal)).toBe(true);
});

test('utils/ScreenInfo: Preserve original values', () => {
  const integerDiagonal: ScreenInfoWithDiagonal = getScreenInfo(1920, 1080, 24) as ScreenInfoWithDiagonal;
  expect(isScreenInfoWithDiagonal(integerDiagonal)).toBe(true);
  expect(integerDiagonal.pixelCount.width).toBe(1920);
  expect(integerDiagonal.pixelCount.height).toBe(1080);
  expect(integerDiagonal.diagonal).toBe(24);

  // `15.3 + 0.3` is `15.600000000000001`
  const floatDiagonal: ScreenInfoWithDiagonal = getScreenInfo(1366, 768, 15.3 + 0.3) as ScreenInfoWithDiagonal;
  expect(isScreenInfoWithDiagonal(floatDiagonal)).toBe(true);
  expect(floatDiagonal.pixelCount.width).toBe(1366);
  expect(floatDiagonal.pixelCount.height).toBe(768);
  expect(floatDiagonal.diagonal).toBeCloseTo(15.6, 8);

  const withoutDiagonal: ScreenInfoBase = getScreenInfo(1920, 1080) as ScreenInfoBase;
  expect(isScreenInfoWithDiagonal(withoutDiagonal)).toBe(false);
  expect(isScreenInfoBase(withoutDiagonal)).toBe(true);
  expect(withoutDiagonal.pixelCount.width).toBe(1920);
  expect(withoutDiagonal.pixelCount.height).toBe(1080);
});

test('utils/ScreenInfo: Round down float width and height', () => {
  const floatWidth: ScreenInfoWithDiagonal = getScreenInfo(1365.3333, 768, 15.6) as ScreenInfoWithDiagonal;
  expect(floatWidth.pixelCount.width).toBe(1365);
  expect(floatWidth.pixelCount.height).toBe(768);
  expect(floatWidth.diagonal).toBe(15.6);

  const floatHeight: ScreenInfoWithDiagonal = getScreenInfo(2436, 1124.30769, 5.8) as ScreenInfoWithDiagonal;
  expect(floatHeight.pixelCount.width).toBe(2436);
  expect(floatHeight.pixelCount.height).toBe(1124);
  expect(floatHeight.diagonal).toBe(5.8);

  const withoutDiagonal: ScreenInfoBase = getScreenInfo(204.8, 153.6) as ScreenInfoBase;
  expect(withoutDiagonal.pixelCount.width).toBe(204);
  expect(withoutDiagonal.pixelCount.height).toBe(153);
});

test('utils/ScreenInfo: Calculate DPI, dot pitch, screen size, and pixel count', () => {
  const fwxga15_6: ScreenInfoWithDiagonal = getScreenInfo(1366, 768, 15.6) as ScreenInfoWithDiagonal;
  expect(fwxga15_6.dpi).toBeCloseTo(100.45, 2);
  expect(fwxga15_6.dotPitch).toBeCloseTo(0.2529, 4);
  expect(fwxga15_6.size.width).toBeCloseTo(34.54, 2);
  expect(fwxga15_6.size.height).toBeCloseTo(19.42, 2);
  expect(fwxga15_6.pixelCount.total).toBe(1_049_088);

  const fhd5_5: ScreenInfoWithDiagonal = getScreenInfo(1080, 1920, 5.5) as ScreenInfoWithDiagonal;
  expect(fhd5_5.dpi).toBeCloseTo(400.53, 2);
  expect(fhd5_5.dotPitch).toBeCloseTo(0.0634, 4);
  expect(fhd5_5.size.width).toBeCloseTo(6.85, 2);
  expect(fhd5_5.size.height).toBeCloseTo(12.18, 2);
  expect(fhd5_5.pixelCount.total).toBe(2_073_600);

  const qhd32: ScreenInfoWithDiagonal = getScreenInfo(2560, 1440, 32) as ScreenInfoWithDiagonal;
  expect(qhd32.dpi).toBeCloseTo(91.79, 2);
  expect(qhd32.dotPitch).toBeCloseTo(0.2767, 4);
  expect(qhd32.size.width).toBeCloseTo(70.84, 2);
  expect(qhd32.size.height).toBeCloseTo(39.85, 2);
  expect(qhd32.pixelCount.total).toBe(3_686_400);

  const uhd43: ScreenInfoWithDiagonal = getScreenInfo(3840, 2160, 43) as ScreenInfoWithDiagonal;
  expect(uhd43.dpi).toBeCloseTo(102.46, 2);
  expect(uhd43.dotPitch).toBeCloseTo(0.2479, 4);
  expect(uhd43.size.width).toBeCloseTo(95.19, 2);
  expect(uhd43.size.height).toBeCloseTo(53.55, 2);
  expect(uhd43.pixelCount.total).toBe(8_294_400);

  const fiveK27: ScreenInfoWithDiagonal = getScreenInfo(5120, 2880, 27) as ScreenInfoWithDiagonal;
  expect(fiveK27.dpi).toBeCloseTo(217.57, 2);
  expect(fiveK27.dotPitch).toBeCloseTo(0.1167, 4);
  expect(fiveK27.size.width).toBeCloseTo(59.77, 2);
  expect(fiveK27.size.height).toBeCloseTo(33.62, 2);
  expect(fiveK27.pixelCount.total).toBe(14_745_600);

  const withoutDiagonal: ScreenInfoWithDiagonal = getScreenInfo(1334, 750) as ScreenInfoWithDiagonal;
  expect(withoutDiagonal.dpi).toBeUndefined();
  expect(withoutDiagonal.dotPitch).toBeUndefined();
  expect(withoutDiagonal.size?.width).toBeUndefined();
  expect(withoutDiagonal.size?.height).toBeUndefined();
  expect(withoutDiagonal.pixelCount.total).toBe(1_000_500);
});

test('utils/ScreenInfo: Calculate aspect ratio', () => {
  const fwxga: ScreenInfoBase = getScreenInfo(1366, 768) as ScreenInfoBase;
  expect(fwxga.ratio).toBeCloseTo(1.778645833333333, 8);

  const ratio4_3: ScreenInfoBase = getScreenInfo(1024, 768) as ScreenInfoBase;
  expect(ratio4_3.ratio).toBeCloseTo(1.333333333333333, 8);

  const ratio5_4: ScreenInfoBase = getScreenInfo(1280, 1024) as ScreenInfoBase;
  expect(ratio5_4.ratio).toBeCloseTo(1.25, 8);

  const ratio16_9: ScreenInfoBase = getScreenInfo(1920, 1080) as ScreenInfoBase;
  expect(ratio16_9.ratio).toBeCloseTo(1.777777777777777, 8);

  const ratio16_10: ScreenInfoBase = getScreenInfo(1920, 1200) as ScreenInfoBase;
  expect(ratio16_10.ratio).toBeCloseTo(1.6, 8);

  const ratio185_9: ScreenInfoBase = getScreenInfo(2960, 1440) as ScreenInfoBase;
  expect(ratio185_9.ratio).toBeCloseTo(2.055555555555555, 8);

  const ratio19_9: ScreenInfoBase = getScreenInfo(3040, 1440) as ScreenInfoBase;
  expect(ratio19_9.ratio).toBeCloseTo(2.11111111111111, 8);

  const ratio195_9: ScreenInfoBase = getScreenInfo(2436, 1125) as ScreenInfoBase;
  expect(ratio195_9.ratio).toBeCloseTo(2.165333333333333, 8);

  const ratio20_9: ScreenInfoBase = getScreenInfo(3200, 1440) as ScreenInfoBase;
  expect(ratio20_9.ratio).toBeCloseTo(2.222222222222222, 8);

  const ratio21_9: ScreenInfoBase = getScreenInfo(2560, 1080) as ScreenInfoBase;
  expect(ratio21_9.ratio).toBeCloseTo(2.370370370370370, 8);
});
