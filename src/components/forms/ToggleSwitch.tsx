import React from 'react';
import './ToggleSwitch.css';

export interface ToggleSwitchProps {
  uncheckedSideLabel?: string,
  checkedSideLabel?: string,
  checked: boolean,
  onChange: (checked: boolean) => void,
};

function ToggleSwitch(props: ToggleSwitchProps) {
  const { uncheckedSideLabel, checkedSideLabel, checked } = props;

  const handleInputChange = function reportToggled(event: React.ChangeEvent<HTMLInputElement>): void {
    props.onChange(event.target.checked);
  };

  return (
    <label className="ToggleSwitch">
      <span className="ToggleSwitch-label">
        {uncheckedSideLabel}
      </span>
      <input
        className="ToggleSwitch-checkbox"
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
      />
      <span className="ToggleSwitch-switch">
        <span className="ToggleSwitch-switch-knob">
        </span>
      </span>
      <span className="ToggleSwitch-label">
        {checkedSideLabel}
      </span>
    </label>
  );
}

export default ToggleSwitch;
