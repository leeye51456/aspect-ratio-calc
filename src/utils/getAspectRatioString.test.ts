import getAspectRatioString from './getAspectRatioString';

test('utils/getAspectRatioString: Invalid parameter', () => {
  const passZeroRatio = () => getAspectRatioString(0);
  expect(passZeroRatio).toThrow(RangeError);
  expect(passZeroRatio).toThrow('positive');

  const passNegativeRatio = () => getAspectRatioString(-1);
  expect(passNegativeRatio).toThrow(RangeError);
  expect(passNegativeRatio).toThrow('positive');
});

test('utils/getAspectRatioString: One to one', () => {
  const ratio1_1 = getAspectRatioString(1);
  expect(ratio1_1).toBe('1:1');
});

test('utils/getAspectRatioString: W:H, where W > H', () => {
  const ratio3_2 = getAspectRatioString(3 / 2);
  expect(ratio3_2).toBe('3:2');

  const ratio4_3 = getAspectRatioString(4 / 3);
  expect(ratio4_3).toBe('4:3');

  const ratio5_4 = getAspectRatioString(5 / 4);
  expect(ratio5_4).toBe('5:4');

  const ratio16_10 = getAspectRatioString(16 / 10);
  expect(ratio16_10).toBe('16:10');

  const ratio16_9 = getAspectRatioString(16 / 9);
  expect(ratio16_9).toBe('16:9');

  const ratio185_9 = getAspectRatioString(18.5 / 9);
  expect(ratio185_9).toBe('18.5:9');

  const ratio19_9 = getAspectRatioString(19 / 9);
  expect(ratio19_9).toBe('19:9');

  const ratio195_9 = getAspectRatioString(19.5 / 9);
  expect(ratio195_9).toBe('19.5:9');

  const ratio20_9 = getAspectRatioString(20 / 9);
  expect(ratio20_9).toBe('20:9');

  const otherRatio = getAspectRatioString(2560 / 1080);
  expect(otherRatio).toBe('21.3:9');
});

test('utils/getAspectRatioString: W:H, where W < H', () => {
  const ratio2_3 = getAspectRatioString(2 / 3);
  expect(ratio2_3).toBe('2:3');

  const ratio3_4 = getAspectRatioString(3 / 4);
  expect(ratio3_4).toBe('3:4');

  const ratio4_5 = getAspectRatioString(4 / 5);
  expect(ratio4_5).toBe('4:5');

  const ratio10_16 = getAspectRatioString(10 / 16);
  expect(ratio10_16).toBe('10:16');

  const ratio9_16 = getAspectRatioString(9 / 16);
  expect(ratio9_16).toBe('9:16');

  const ratio9_185 = getAspectRatioString(9 / 18.5);
  expect(ratio9_185).toBe('9:18.5');

  const ratio9_19 = getAspectRatioString(9 / 19);
  expect(ratio9_19).toBe('9:19');

  const ratio9_195 = getAspectRatioString(9 / 19.5);
  expect(ratio9_195).toBe('9:19.5');

  const ratio9_20 = getAspectRatioString(9 / 20);
  expect(ratio9_20).toBe('9:20');

  const otherRatio = getAspectRatioString(1080 / 2560);
  expect(otherRatio).toBe('9:21.3');
});
