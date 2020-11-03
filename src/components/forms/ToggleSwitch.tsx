import React from 'react';

export interface ToggleSwitchProps {
  leftLabel?: string,
  rightLabel?: string,
  checked: boolean,
  onChange: (checked: boolean) => void,
};

function ToggleSwitch(props: ToggleSwitchProps) {
  const { leftLabel, rightLabel, checked } = props;

  const handleInputChange = function reportToggled(event: React.ChangeEvent<HTMLInputElement>): void {
    props.onChange(event.target.checked);
  };

  return (
    <label>
      <span>
        {leftLabel}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
      />
      <span>
        {rightLabel}
      </span>
    </label>
  );
}

export default ToggleSwitch;
