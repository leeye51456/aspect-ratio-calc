import React from 'react';
import { render } from '@testing-library/react';
import ScreenForm, { ScreenFormPropName, ScreenFormProps } from './ScreenForm';

test('components/forms/ScreenForm: Render ScreenForm component', () => {
  const props: ScreenFormProps = {
    id: 0,
    width: '1920',
    height: '1080',
    diagonal: '24',
    onChange: (id: number, propName: ScreenFormPropName, propValue: string): void => {},
    onRemove: (id: number): void => {},
  };
  const renderResult = render(<ScreenForm { ...props } />);

  expect(renderResult.container.firstChild).toHaveClass('ScreenForm');
  expect(renderResult.container.firstChild).toHaveStyle('width: 100%');
  expect(renderResult.container.firstChild.firstChild).toHaveStyle('padding-bottom: 56.25%');

  expect(renderResult.getByDisplayValue(props.width)).toHaveAttribute('title', 'Width');
  expect(renderResult.getByDisplayValue(props.height)).toHaveAttribute('title', 'Height');
  expect(renderResult.getByDisplayValue(props.diagonal)).toHaveAttribute('title', 'Diagonal');

  expect(renderResult.getByText(/\baspect ratio\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bdpi\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bdot pitch\b/i)).toBeInTheDocument();
  expect(renderResult.getByText(/\bpixel count\b/i)).toBeInTheDocument();
});
