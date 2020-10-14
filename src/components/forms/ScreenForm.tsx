import React, { useRef } from 'react';
import ScreenFormBg from './ScreenFormBg';
import { getScreenInfo, ScreenInfo } from '../../utils/getScreenInfo';
import { getAspectRatioString } from '../../utils/getAspectRatioString';
import './ScreenForm.css';

export type ScreenFormPropName = 'width' | 'height' | 'diagonal';

interface ScreenFormProps {
  children?: React.ReactNode,
  id: number,
  width: string,
  height: string,
  diagonal: string,
  onChange: (id: number, propName: ScreenFormPropName, propValue: string) => void,
  onRemove: (id: number) => void,
}

const defaultScreenInfo: ScreenInfo = getScreenInfo(1920, 1080, 24);

const maxWidth: number = 360;

const getContainerStyle = function getContainerStyleByRatio(ratio: number): { width: string } {
  if (ratio < 9 / 22) {
    return { width: `${100 * 9 / 22}%` }; // If ratio < 9:22, fix ratio 9:22
  } else if (ratio < 1) {
    return { width: `${100 * ratio}%` }; // If 9:22 <= ratio < 1, use width = ratio
  } else {
    return { width: '100%' }; // If ratio >= 1, use width = 100%
  }
};

const getRatioStyle = function getRatioStyleByRatio(ratio: number): { paddingBottom: string } {
  if (ratio > 22 / 9) {
    return { paddingBottom: `${100 * 9 / 22}%` }; // If ratio > 22:9, fix ratio 22:9
  } else if (ratio < 9 / 22) {
    return { paddingBottom: `${100 * 22 / 9}%` }; // If ratio < 9:22, use ratio 9:22
  } else {
    return { paddingBottom: `${100 / ratio}%` }; // If 9:22 <= ratio <= 22:9, use 1 / ratio
  }
};

const getFormWidth = function getFormWidthByPixels(ratio: number): number {
  if (ratio < 9 / 22) {
    return maxWidth * 9 / 22; // ratio < 9:22
  } else if (ratio < 1) {
    return maxWidth * ratio; // 9:22 <= ratio < 1
  } else {
    return maxWidth; // ratio >= 1
  }
};

const getFormHeight = function getFormHeightByPixels(ratio: number): number {
  if (ratio > 22 / 9) {
    return maxWidth * 9 / 22; // ratio > 22:9
  } else if (ratio <= 1) {
    return maxWidth; // ratio <= 1
  } else {
    return maxWidth / ratio; // 1 < ratio <= 22:9
  }
};

const insertCommas = function insertCommasIntoIneger(integer: number): string {
  return integer.toFixed().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

function ScreenForm(props: ScreenFormProps) {
  const widthInputRef = useRef<HTMLInputElement>(null);
  const heightInputRef = useRef<HTMLInputElement>(null);
  const diagonalInputRef = useRef<HTMLInputElement>(null);

  const [ width, height ]: number[] = [props.width, props.height].map((value) => parseInt(value, 10));
  const diagonal: number = parseFloat(props.diagonal);
  const isFormValid: boolean = !(
    isNaN(width) || isNaN(height) || isNaN(diagonal) || width <= 0 || height <= 0 || diagonal <= 0
  );

  const {
    ratio,
    dpi,
    dotPitch,
    pixelCount: { total: totalPixels },
    size,
  }: ScreenInfo = isFormValid ? getScreenInfo(width, height, diagonal) : defaultScreenInfo;

  const containerStyle: { width: string } = getContainerStyle(ratio);
  const ratioStyle: { paddingBottom: string } = getRatioStyle(ratio);

  const handleInputChangeWith = (prop: ScreenFormPropName) => (
    (event: React.ChangeEvent<HTMLInputElement>) => {
      props.onChange(props.id, prop, event.target.value);
    }
  );

  const handleInputBlur = () => {
    const isWidthEmpty = widthInputRef.current?.value === '';
    const isHeightEmpty = heightInputRef.current?.value === '';
    const isDiagonalEmpty = diagonalInputRef.current?.value === '';
    if (isWidthEmpty && isHeightEmpty && isDiagonalEmpty) {
      props.onRemove(props.id);
    }
  };

  return (
    <div
      data-testid="ScreenForm"
      className="ScreenForm"
      style={containerStyle}
    >
      <div
        className="ScreenForm-ratio"
        style={ratioStyle}
      />

      <div className="ScreenForm-content">
        <div className="ScreenForm-bg">
          <ScreenFormBg width={getFormWidth(ratio)} height={getFormHeight(ratio)} />
        </div>

        <div className="ScreenForm-grid">
          <ul className="ScreenForm-grid-item ScreenForm-width">
            <li>
              <input
                ref={widthInputRef}
                className="ScreenForm-input"
                type="text"
                value={props.width}
                inputMode="numeric"
                title="Width"
                onChange={handleInputChangeWith('width')}
                onBlur={handleInputBlur}
              />&nbsp;px
            </li>
            <li>
              {isFormValid ? `${size.width.toFixed(2)}cm` : '-'}
            </li>
          </ul>
          <ul className="ScreenForm-grid-item ScreenForm-height">
            <li>
              <input
                ref={heightInputRef}
                className="ScreenForm-input"
                type="text"
                value={props.height}
                inputMode="numeric"
                title="Height"
                onChange={handleInputChangeWith('height')}
                onBlur={handleInputBlur}
              />&nbsp;px
            </li>
            <li>
              {isFormValid ? `${size.height.toFixed(2)}cm` : '-'}
            </li>
          </ul>
          <ul className="ScreenForm-grid-item ScreenForm-diagonal">
            <li>
              <input
                ref={diagonalInputRef}
                className="ScreenForm-input"
                type="text"
                value={props.diagonal}
                inputMode="decimal"
                title="Diagonal"
                onChange={handleInputChangeWith('diagonal')}
                onBlur={handleInputBlur}
              />&nbsp;in
            </li>
          </ul>
        </div>

        <div className="ScreenForm-misc">
          <ul>
            <li className="ScreenForm-misc-pairs">
              <span className="ScreenForm-misc-pair">
                <span className="ScreenForm-misc-key">
                  Aspect&nbsp;ratio&nbsp;
                </span>
                <span className="ScreenForm-misc-value">
                  {ratio.toFixed(2)}:1&nbsp;({getAspectRatioString(ratio)})
                </span>
              </span>
            </li>
            <li className="ScreenForm-misc-pairs">
              <span className="ScreenForm-misc-pair">
                <span className="ScreenForm-misc-key">
                  DPI&nbsp;
                </span>
                <span className="ScreenForm-misc-value">
                  {dpi.toFixed(2)}
                </span>
              </span>
              {' '}
              <span className="ScreenForm-misc-pair">
                <span className="ScreenForm-misc-key">
                  Dot&nbsp;pitch&nbsp;
                </span>
                <span className="ScreenForm-misc-value">
                  {dotPitch.toFixed(4)}mm
                </span>
              </span>
            </li>
            <li className="ScreenForm-misc-pairs">
              <span className="ScreenForm-misc-pair">
                <span className="ScreenForm-misc-key">
                  Pixel&nbsp;count&nbsp;
                </span>
                <span className="ScreenForm-misc-value">
                  {insertCommas(totalPixels)}
                </span>
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ScreenForm;
