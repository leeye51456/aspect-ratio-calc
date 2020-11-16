import React from 'react';
import getAspectRatioString from '../../../utils/getAspectRatioString';
import { insertCommas } from '../../../utils/number';
import './ScreenFormMisc.css';

interface ScreenFormMiscProps {
  ratio: number | null,
  dpi: number | null,
  dotPitch: number | null,
  totalPixels: number | null,
}

function ScreenFormMisc({ ratio, dpi, dotPitch, totalPixels }: ScreenFormMiscProps) {
  return (
    <div className="ScreenFormMisc">
      <ul className="ScreenFormMisc-info">
        <li className="ScreenFormMisc-pairs">
          <span className="ScreenFormMisc-pair">
            <span className="ScreenFormMisc-key">
              Aspect&nbsp;ratio&nbsp;
            </span>
            <span className="ScreenFormMisc-value">
              {ratio ? `${ratio.toFixed(2)}:1 (${getAspectRatioString(ratio)})` : '-'}
            </span>
          </span>
        </li>
        <li className="ScreenFormMisc-pairs">
          <span className="ScreenFormMisc-pair">
            <span className="ScreenFormMisc-key">
              DPI&nbsp;
            </span>
            <span className="ScreenFormMisc-value">
              {dpi ? dpi.toFixed(2) : '-'}
            </span>
          </span>
          {' '}
          <span className="ScreenFormMisc-pair">
            <span className="ScreenFormMisc-key">
              Dot&nbsp;pitch&nbsp;
            </span>
            <span className="ScreenFormMisc-value">
              {dotPitch ? `${dotPitch.toFixed(4)}mm` : '-'}
            </span>
          </span>
        </li>
        <li className="ScreenFormMisc-pairs">
          <span className="ScreenFormMisc-pair">
            <span className="ScreenFormMisc-key">
              Pixel&nbsp;count&nbsp;
            </span>
            <span className="ScreenFormMisc-value">
              {totalPixels ? insertCommas(totalPixels) : '-'}
            </span>
          </span>
        </li>
      </ul>
    </div>
  );
}

export default ScreenFormMisc;
