import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders empty App component', () => {
  const { getByTestId } = render(<App />);
  const renderedComponent = getByTestId('App');
  expect(renderedComponent).toHaveClass('App');
});
