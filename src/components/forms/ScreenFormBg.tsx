import React from 'react';
import './ScreenFormBg.css';

interface ScreenFormBgProps {
  width: number,
  height: number,
}

interface SvgLineXy {
  x1: number,
  y1: number,
  x2: number,
  y2: number,
}

const padding: number = 10;
const arrowTipSide: number = 10;
const twentyDegrees: number = 20 * Math.PI / 180;

const getTransposedSvgLineAttrs = function getTransposedSvgLineAttributes(svgLineAttrs: SvgLineXy): SvgLineXy {
  const { x1, y1, x2, y2 }: SvgLineXy = svgLineAttrs;
  return {
    x1: y1,
    y1: x1,
    x2: y2,
    y2: x2,
  };
};

const getWidthArrowBodyAttrs = function getWidthArrowBodyAttributes(width: number, height: number): SvgLineXy {
  const y = height * 5 / 6;
  return {
    x1: padding,
    y1: y,
    x2: width - padding,
    y2: y,
  };
};

const getDiagonalArrowBodyAttrs = function getDiagonalArrowBodyAttributes(width: number, height: number): SvgLineXy {
  return {
    x1: padding,
    y1: height - padding,
    x2: width - padding,
    y2: padding,
  };
};

const getWidthArrowTips = function getTipsOfWidthArrow(width: number, height: number): string[] {
  const arrowY: number = height * 5 / 6;
  const tipHalfWidth: number = arrowTipSide * Math.sin(twentyDegrees);
  const tipHeight: number = arrowTipSide * Math.cos(twentyDegrees);

  return [
    [
      `${padding}`,
      `${arrowY}`,
      `${padding + tipHeight}`,
      `${arrowY - tipHalfWidth}`,
      `${padding + tipHeight}`,
      `${arrowY + tipHalfWidth}`,
      `${padding}`,
      `${arrowY}`,
    ].join(' '),
    [
      `${width - padding}`,
      `${arrowY}`,
      `${width - (padding + tipHeight)}`,
      `${arrowY + tipHalfWidth}`,
      `${width - (padding + tipHeight)}`,
      `${arrowY - tipHalfWidth}`,
      `${width - padding}`,
      `${arrowY}`,
    ].join(' '),
  ];
};

const getHeightArrowTips = function getTipsOfHeightArrow(width: number, height: number): string[] {
  const arrowX: number = width * 5 / 6;
  const tipHalfWidth: number = arrowTipSide * Math.sin(twentyDegrees);
  const tipHeight: number = arrowTipSide * Math.cos(twentyDegrees);

  return [
    [
      `${arrowX}`,
      `${padding}`,
      `${arrowX + tipHalfWidth}`,
      `${padding + tipHeight}`,
      `${arrowX - tipHalfWidth}`,
      `${padding + tipHeight}`,
      `${arrowX}`,
      `${padding}`,
    ].join(' '),
    [
      `${arrowX}`,
      `${height - padding}`,
      `${arrowX - tipHalfWidth}`,
      `${height - (padding + tipHeight)}`,
      `${arrowX + tipHalfWidth}`,
      `${height - (padding + tipHeight)}`,
      `${arrowX}`,
      `${height - padding}`,
    ].join(' '),
  ];
};

const getDiagonalArrowTips = function getTipsOfDiagonalArrow(width: number, height: number): string[] {
  const diagonalAngle: number = Math.acos(
    (width - 2 * padding) / Math.sqrt((width - 2 * padding) ** 2 + (height - 2 * padding) ** 2)
  );
  const rightCornerXOffset: number = arrowTipSide * Math.cos(diagonalAngle + twentyDegrees);
  const rightCornerYOffset: number = arrowTipSide * Math.sin(diagonalAngle + twentyDegrees);
  const leftCornerXOffset: number = arrowTipSide * Math.cos(diagonalAngle - twentyDegrees);
  const leftCornerYOffset: number = arrowTipSide * Math.sin(diagonalAngle - twentyDegrees);

  return [
    [
      `${padding}`,
      `${height - padding}`,
      `${padding + rightCornerXOffset}`,
      `${height - padding - rightCornerYOffset}`,
      `${padding + leftCornerXOffset}`,
      `${height - padding - leftCornerYOffset}`,
      `${padding}`,
      `${height - padding}`,
    ].join(' '),
    [
      `${width - padding}`,
      `${padding}`,
      `${width - padding - rightCornerXOffset}`,
      `${padding + rightCornerYOffset}`,
      `${width - padding - leftCornerXOffset}`,
      `${padding + leftCornerYOffset}`,
      `${width - padding}`,
      `${padding}`,
    ].join(' '),
  ]
};


function ScreenFormBg(props: ScreenFormBgProps) {
  const { width, height }: { width: number, height: number } = props;

  const widthArrowBodyAttrs: SvgLineXy = getWidthArrowBodyAttrs(width, height);
  const heightArrowBodyAttrs: SvgLineXy = getTransposedSvgLineAttrs(getWidthArrowBodyAttrs(height, width));
  const diagonalArrowBodyAttrs: SvgLineXy = getDiagonalArrowBodyAttrs(width, height);

  const widthArrowTips: string[] = getWidthArrowTips(width, height);
  const heightArrowTips: string[] = getHeightArrowTips(width, height);
  const diagonalArrowTips: string[] = getDiagonalArrowTips(width, height);

  return (
    <svg
      width={props.width}
      height={props.height}
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
