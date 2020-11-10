import React, { useEffect, useRef } from 'react';
import ScreenFormBg from './ScreenFormBg';
import copyToClipboard from '../../utils/copyToClipboard';
import {
  AvailableUnit,
  getScreenInfo,
  RectSize,
  ScreenInfo,
  ScreenInfoBase,
  ScreenInfoWithDiagonal,
  toCentimeters,
  toInches,
  tryParsePositiveFloat,
} from '../../utils/ScreenInfo';
import { getAspectRatioString } from '../../utils/getAspectRatioString';
import icons from '../common/icons';
import './ScreenForm.css';

export type ScreenFormPropName = 'width' | 'height' | 'diagonal';

export interface ScreenFormChangedProps {
  width?: string,
  height?: string,
  diagonal?: string,
};

export interface ScreenFormProps {
  children?: React.ReactNode,
  id: number,
  width: string,
  height: string,
  diagonal: string,
  diagonalUnit: AvailableUnit,
  sizeUnit: AvailableUnit,
  onChange: (id: number, changed: ScreenFormChangedProps) => void,
  onRemove: (id: number) => void,
};

const { ratio: defaultDisplayedRatio }: { ratio: number } = getScreenInfo(1920, 1080, 24) as ScreenInfoWithDiagonal;

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

  const { width, height, diagonal, diagonalUnit, sizeUnit }: ScreenFormProps = props;
  const floatDiagonal: number | null = tryParsePositiveFloat(diagonal);
  let otherDiagonal: string = '-';
  if (floatDiagonal) {
    if (diagonalUnit === 'in') {
      otherDiagonal = `${toCentimeters(floatDiagonal).toFixed(2)}cm`;
    } else {
      otherDiagonal = `${toInches(floatDiagonal).toFixed(2)}"`;
    }
  }

  const screenInfo: ScreenInfo | null = getScreenInfo(width, height, diagonal, diagonalUnit);

  let ratio: number | null = null;
  let dpi: number | null = null;
  let dotPitch: number | null = null;
  let size: RectSize | null = null;
  let totalPixels: number | null = null;
  if (screenInfo instanceof ScreenInfoWithDiagonal) {
    ({ ratio, dpi, dotPitch, size, pixelCount: { total: totalPixels } } = screenInfo);
    if (sizeUnit === 'in') {
      size = {
        width: toInches(size.width),
        height: toInches(size.height),
      };
    }
  } else if (screenInfo instanceof ScreenInfoBase) {
    ({ ratio, pixelCount: { total: totalPixels } } = screenInfo);
  }

  const renderedRatio: number = ratio || defaultDisplayedRatio;
  const wrapperStyle: { width: string } = getContainerStyle(renderedRatio);
  const ratioStyle: { paddingBottom: string } = getRatioStyle(renderedRatio);

  const handleRotateClick = function changeSelfRotated() {
    props.onChange(props.id, {
      width: height,
      height: width,
    });
  };

  const handleCopyClick = function copySelf() {
    if (screenInfo !== null) {
      copyToClipboard(`${screenInfo.toYaml({ diagonalUnit, sizeUnit })}\n`);
    }
  }

  const handleRemoveClick = function removeSelf() {
    props.onRemove(props.id);
  };

  const handleInputChangeWith = function getInputChangeHandlerByProp(prop: ScreenFormPropName) {
    return function handleInputChange(event: React.ChangeEvent<HTMLInputElement>): void {
      props.onChange(props.id, { [prop]: event.target.value });
    };
  };

  const handleInputBlur = function checkInputsAndRemove(): void {
    const isWidthEmpty = widthInputRef.current?.value === '';
    const isHeightEmpty = heightInputRef.current?.value === '';
    const isDiagonalEmpty = diagonalInputRef.current?.value === '';
    if (isWidthEmpty && isHeightEmpty && isDiagonalEmpty) {
      props.onRemove(props.id);
    }
  };

  useEffect(() => {
    widthInputRef.current?.focus();
  }, []);

  return (
    <div
      data-testid="ScreenForm"
      style={wrapperStyle}
    >
      <div className="ScreenForm-function">
        <button
          className="ScreenForm-function-button"
          type="button"
          onClick={handleRotateClick}
        >
          <img src={icons.rotate} alt="Rotate" />
        </button>
        <button
          className="ScreenForm-function-button"
          type="button"
          onClick={handleCopyClick}
        >
          <img src={icons.copy} alt="Copy" />
        </button>
        <button
          className="ScreenForm-function-button-negative"
          type="button"
          onClick={handleRemoveClick}
        >
          <img src={icons.remove} alt="Remove" />
        </button>
      </div>

      <div className="ScreenForm-screen">
        <div
          className="ScreenForm-ratio"
          style={ratioStyle}
        />

        <div className="ScreenForm-content">
          <div className="ScreenForm-bg">
            <ScreenFormBg
              width={getFormWidth(renderedRatio)}
              height={getFormHeight(renderedRatio)}
            />
          </div>

          <div className="ScreenForm-grid">
            <ul className="ScreenForm-grid-item ScreenForm-width">
              <li>
                <input
                  ref={widthInputRef}
                  className="ScreenForm-input"
                  type="text"
                  value={width}
                  inputMode="numeric"
                  title="Width"
                  onChange={handleInputChangeWith('width')}
                  onBlur={handleInputBlur}
                />&nbsp;px
              </li>
              <li>
                {size ? `${size.width.toFixed(2)}${sizeUnit === 'in' ? '"' : sizeUnit}` : '-'}
              </li>
            </ul>
            <ul className="ScreenForm-grid-item ScreenForm-height">
              <li>
                <input
                  ref={heightInputRef}
                  className="ScreenForm-input"
                  type="text"
                  value={height}
                  inputMode="numeric"
                  title="Height"
                  onChange={handleInputChangeWith('height')}
                  onBlur={handleInputBlur}
                />&nbsp;px
              </li>
              <li>
                {size ? `${size.height.toFixed(2)}${sizeUnit === 'in' ? '"' : sizeUnit}` : '-'}
              </li>
            </ul>
            <ul className="ScreenForm-grid-item ScreenForm-diagonal">
              <li>
                <input
                  ref={diagonalInputRef}
                  className="ScreenForm-input"
                  type="text"
                  value={diagonal}
                  inputMode="decimal"
                  title="Diagonal"
                  onChange={handleInputChangeWith('diagonal')}
                  onBlur={handleInputBlur}
                />&nbsp;{diagonalUnit}
              </li>
              <li>
                {otherDiagonal}
              </li>
            </ul>
          </div>

          <div className="ScreenForm-misc">
            <ul className="ScreenForm-misc-info">
              <li className="ScreenForm-misc-pairs">
                <span className="ScreenForm-misc-pair">
                  <span className="ScreenForm-misc-key">
                    Aspect&nbsp;ratio&nbsp;
                  </span>
                  <span className="ScreenForm-misc-value">
                    {ratio ? `${ratio.toFixed(2)}:1 (${getAspectRatioString(ratio)})` : '-'}
                  </span>
                </span>
              </li>
              <li className="ScreenForm-misc-pairs">
                <span className="ScreenForm-misc-pair">
                  <span className="ScreenForm-misc-key">
                    DPI&nbsp;
                  </span>
                  <span className="ScreenForm-misc-value">
                    {dpi ? dpi.toFixed(2) : '-'}
                  </span>
                </span>
                {' '}
                <span className="ScreenForm-misc-pair">
                  <span className="ScreenForm-misc-key">
                    Dot&nbsp;pitch&nbsp;
                  </span>
                  <span className="ScreenForm-misc-value">
                    {dotPitch ? `${dotPitch.toFixed(4)}mm` : '-'}
                  </span>
                </span>
              </li>
              <li className="ScreenForm-misc-pairs">
                <span className="ScreenForm-misc-pair">
                  <span className="ScreenForm-misc-key">
                    Pixel&nbsp;count&nbsp;
                  </span>
                  <span className="ScreenForm-misc-value">
                    {totalPixels ? insertCommas(totalPixels) : '-'}
                  </span>
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ScreenForm;
