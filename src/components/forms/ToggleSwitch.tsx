import React from 'react';

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
    <label>
      <span>
        {uncheckedSideLabel}
      </span>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleInputChange}
      />
      <span>
        {checkedSideLabel}
      </span>
    </label>
  );
}

export default ToggleSwitch;
