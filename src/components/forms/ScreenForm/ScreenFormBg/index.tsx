import React from 'react';
import {
  getDiagonalArrowBodyAttrs,
  getDiagonalArrowTips,
  getHeightArrowTips,
  getTransposedSvgLineAttrs,
  getWidthArrowBodyAttrs,
  getWidthArrowTips,
  SvgLineXy,
} from './attributeFunctions';
import './index.css';

interface ScreenFormBgProps {
  width: number,
  height: number,
}

function ScreenFormBg(props: ScreenFormBgProps) {
  const { width, height }: ScreenFormBgProps = props;

  const widthArrowBodyAttrs: SvgLineXy = getWidthArrowBodyAttrs(width, height);
  const heightArrowBodyAttrs: SvgLineXy = getTransposedSvgLineAttrs(getWidthArrowBodyAttrs(height, width));
  const diagonalArrowBodyAttrs: SvgLineXy = getDiagonalArrowBodyAttrs(width, height);

  const widthArrowTips: string[] = getWidthArrowTips(width, height);
  const heightArrowTips: string[] = getHeightArrowTips(width, height);
  const diagonalArrowTips: string[] = getDiagonalArrowTips(width, height);

  return (
    <svg
      viewBox={`0 0 ${props.width} ${props.height}`}
      width="100%"
    >
      <line { ...widthArrowBodyAttrs } className="ScreenFormBg-svg-stroke" />
      <line { ...heightArrowBodyAttrs } className="ScreenFormBg-svg-stroke" />
      <line { ...diagonalArrowBodyAttrs } className="ScreenFormBg-svg-stroke" />

      <polygon points={widthArrowTips[0]} className="ScreenFormBg-svg-fill" />
      <polygon points={widthArrowTips[1]} className="ScreenFormBg-svg-fill" />
      <polygon points={heightArrowTips[0]} className="ScreenFormBg-svg-fill" />
      <polygon points={heightArrowTips[1]} className="ScreenFormBg-svg-fill" />
      <polygon points={diagonalArrowTips[0]} className="ScreenFormBg-svg-fill" />
      <polygon points={diagonalArrowTips[1]} className="ScreenFormBg-svg-fill" />
    </svg>
  );
}

export default ScreenFormBg;
