import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ToggleSwitch, { ToggleSwitchProps } from './ToggleSwitch';

test('components/forms/ToggleSwitch: Render ToggleSwitch component', () => {
  const onChange = jest.fn();
  const props: ToggleSwitchProps = {
    uncheckedSideLabel: 'unchecked',
    checkedSideLabel: 'checked',
    checked: false,
    onChange: (checked: boolean) => onChange(),
  }
  const renderResult = render(<ToggleSwitch {...props} />);

  expect(renderResult.getByText(/\bunchecked\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bchecked\b/i)).toBeInTheDocument();

  expect(renderResult.getByText(/\bunchecked\b/i)).toHaveClass('ToggleSwitch-label');
  expect(renderResult.getByText(/\bchecked\b/i)).toHaveClass('ToggleSwitch-label');

  expect(renderResult.getByRole('checkbox')).not.toBeChecked();

  userEvent.click(renderResult.getByText(/\bchecked\b/i));
  expect(onChange).toHaveBeenCalled();
});
