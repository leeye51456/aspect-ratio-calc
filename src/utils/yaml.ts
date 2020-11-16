import { StoredScreenFormProps } from '../hooks/useScreenData';
import { getScreenInfo, ScreenInfo, UnitOptions } from './ScreenInfo';

const buildScreenInfoYamlEntry = function buildScreenInfoYamlEntryOfArray(
  screenInfo: ScreenInfo,
  options: UnitOptions,
): string {
  const map = screenInfo.toMap(options);
  return '- ' + Array.from(map.keys()).map((key) => `${key}: ${map.get(key)}`).join('\n  ');
};

export const getWholeYaml = function getWholeYamlFromScreenFormData(
  screenFormData: StoredScreenFormProps[],
  options: UnitOptions = { diagonalUnit: 'in', sizeUnit: 'cm' },
): string {
  const screens: ScreenInfo[] = screenFormData.reduce<ScreenInfo[]>(
    (acc: ScreenInfo[], props: StoredScreenFormProps) => {
      const { width, height, diagonal }: StoredScreenFormProps = props;
      const screenInfo: ScreenInfo | null = getScreenInfo(width, height, diagonal, options.diagonalUnit);
      if (screenInfo !== null) {
        acc.push(screenInfo);
      }
      return acc;
    },
    []
  );
  const yamls: string[] = screens.map((screen: ScreenInfo) => buildScreenInfoYamlEntry(screen, options));
  return yamls.join('\n\n') + '\n';
};

export const getSingleYaml = function getSingleYamlFromScreenInfo(
  screenInfo: ScreenInfo,
  options: UnitOptions = { diagonalUnit: 'in', sizeUnit: 'cm' },
): string {
  const map = screenInfo.toMap(options);
  return Array.from(map.keys())
    .map((key) => `${key}: ${map.get(key)}`)
    .join('\n');
};
