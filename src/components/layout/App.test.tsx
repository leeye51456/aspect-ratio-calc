import React from 'react';
import 'react-dom/test-utils';
import { render, RenderResult } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('components/layout/App: Render App component', () => {
  const renderedComponent: RenderResult = render(<App />);

  expect(renderedComponent.getByTestId('App')).toHaveClass('App');

  const headerTitle: HTMLElement = renderedComponent.getByText(/aspect ratio calculator/i);
  expect(headerTitle).toBeInTheDocument();

  const copyButton: HTMLElement = renderedComponent.getByAltText(/^copy all$/i);
  const addButton: HTMLElement = renderedComponent.getByAltText(/^add$/i);
  expect(copyButton).toBeInTheDocument();
  expect(addButton).toBeInTheDocument();
});

test('components/layout/App: Click add button', () => {
  const renderedComponent: RenderResult = render(<App />);

  const addButton: HTMLElement = renderedComponent.getByAltText(/^add$/i);
  expect(addButton).toBeInTheDocument();

  userEvent.click(addButton);

  const pixelCountText: HTMLElement = renderedComponent.getByText(/^pixel count$/i);
  expect(pixelCountText).toBeInTheDocument();
});
