import React from 'react';
import { render } from '@testing-library/react';
import ScreenForm from './ScreenForm';

test('components/forms/ScreenForm: Render ScreenForm component', () => {
  const { getByTestId } = render(<ScreenForm width={1920} height={1080} diagonal={24} />);
  const renderedComponent = getByTestId('ScreenForm');
  expect(renderedComponent).toHaveClass('ScreenForm');
});
