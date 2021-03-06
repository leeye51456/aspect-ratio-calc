import React, { useEffect, useRef } from 'react';
import { getContainerStyle, getFormHeight, getFormWidth, getRatioStyle } from './styleFunctions';
import ScreenFormBg from './ScreenFormBg';
import copyToClipboard from '../../../utils/copyToClipboard';
import { tryParsePositiveFloat } from '../../../utils/number';
import {
  AvailableUnit,
  getScreenInfo,
  RectSize,
  ScreenInfo,
  ScreenInfoBase,
  ScreenInfoWithDiagonal,
  toCentimeters,
  toInches,
} from '../../../utils/ScreenInfo';
import { getSingleYaml } from '../../../utils/yaml';
import icons from '../../common/icons';
import './index.css';
import ScreenFormMisc from './ScreenFormMisc';

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

const { ratio: defaultDisplayedRatio }: { ratio: number } = getScreenInfo(1920, 1080) as ScreenInfoBase;

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
      copyToClipboard(`${getSingleYaml(screenInfo, { diagonalUnit, sizeUnit })}\n`);
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
          <img src={icons.rotate} alt="Rotate" width={24} height={24} />
        </button>
        <button
          className="ScreenForm-function-button"
          type="button"
          onClick={handleCopyClick}
        >
          <img src={icons.copy} alt="Copy" width={24} height={24} />
        </button>
        <button
          className="ScreenForm-function-button-negative"
          type="button"
          onClick={handleRemoveClick}
        >
          <img src={icons.remove} alt="Remove" width={24} height={24} />
        </button>
      </div>

      <div className="ScreenForm-screen">
        <div
          className="ScreenForm-ratio"
          style={ratioStyle}
        />

        <div className="ScreenForm-content">
          <ScreenFormBg
            width={getFormWidth(renderedRatio)}
            height={getFormHeight(renderedRatio)}
          />

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

          <ScreenFormMisc
            ratio={ratio}
            dpi={dpi}
            dotPitch={dotPitch}
            totalPixels={totalPixels}
          />
        </div>
      </div>
    </div>
  );
}

export default ScreenForm;
