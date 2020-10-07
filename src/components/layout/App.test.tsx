import React from 'react';
import { render, RenderResult } from '@testing-library/react';
import App from './App';

test('components/layout/App: Render App component', () => {
  const renderedComponent: RenderResult = render(<App />);

  expect(renderedComponent.getByTestId('App')).toHaveClass('App');

  const headerTitle: HTMLElement = renderedComponent.getByText(/aspect ratio calculator/i);
  expect(headerTitle).toBeInTheDocument();

  const button: HTMLElement = renderedComponent.getByText(/^add$/i);
  expect(button).toBeInTheDocument();
});
