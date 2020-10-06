import React from 'react';
import { getScreenInfo, ScreenInfo } from '../../utils/getScreenInfo';
import './ScreenForm.css';

interface ScreenFormProps {
  children?: React.ReactNode,
  width: number,
  height: number,
  diagonal: number,
}

function ScreenForm(props: ScreenFormProps) {
  const screenInfo: ScreenInfo = getScreenInfo(props.width, props.height, props.diagonal);

  const containerStyle = (
    screenInfo.ratio < 1
    ? { width: `${screenInfo.ratio * 100}%` } // If ratio < 1, width = ratio
    : {} // If ratio >= 1, width = 100% (use default)
  );

  const ratioStyle = { paddingBottom: `${100 / screenInfo.ratio}%` }; // paddingBottom (as height) = 1 / ratio

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
          {/* Background graphic with size arrows */}
        </div>
        <div className="ScreenForm-grid">
          <div className="ScreenForm-grid-item ScreenForm-width">
            {/* Width input form and calculated actual screen width */}
          </div>
          <div className="ScreenForm-grid-item ScreenForm-height">
            {/* Height input form and calculated actual screen height */}
          </div>
          <div className="ScreenForm-grid-item ScreenForm-diagonal">
            {/* Diagonal input form */}
          </div>
        </div>
        <div className="ScreenForm-misc">
          {/* Miscellaneous infos */}
        </div>
      </div>
    </div>
  );
}

export default ScreenForm;
