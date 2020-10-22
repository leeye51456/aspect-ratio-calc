import React from 'react';
import { render } from '@testing-library/react';
import ScreenForm, { ScreenFormPropName, ScreenFormProps } from './ScreenForm';

test('components/forms/ScreenForm: Render ScreenForm component', () => {
  const props: ScreenFormProps = {
    id: 0,
    width: '1920',
    height: '1080',
    diagonal: '24',
    onChange: (): void => {},
    onRemove: (): void => {},
  };
  const renderResult = render(<ScreenForm { ...props } />);

  expect(renderResult.getByDisplayValue(props.width)).toHaveAttribute('title', 'Width');
  expect(renderResult.getByDisplayValue(props.height)).toHaveAttribute('title', 'Height');
  expect(renderResult.getByDisplayValue(props.diagonal)).toHaveAttribute('title', 'Diagonal');

  expect(renderResult.getByText(/\baspect ratio\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bdpi\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bdot pitch\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bpixel count\b/i)).toBeInTheDocument();
});
