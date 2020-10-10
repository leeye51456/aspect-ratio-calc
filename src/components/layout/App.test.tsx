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

  const button: HTMLElement = renderedComponent.getByText(/^add$/i);
  expect(button).toBeInTheDocument();
});

test('components/layout/App: Click add button', () => {
  const renderedComponent: RenderResult = render(<App />);

  const addButton: HTMLElement = renderedComponent.getByText(/^add$/i);
  expect(addButton).toBeInTheDocument();

  userEvent.click(addButton);

  const widthInput: HTMLElement = renderedComponent.getByDisplayValue(/^1920$/);
  const heightInput: HTMLElement = renderedComponent.getByDisplayValue(/^1080$/);
  const diagonalInput: HTMLElement = renderedComponent.getByDisplayValue(/^24$/);
  const aspectRatioText: HTMLElement = renderedComponent.getByText(/^aspect ratio$/i);
  const dpiText: HTMLElement = renderedComponent.getByText(/^dpi$/i);
  const dotPitchText: HTMLElement = renderedComponent.getByText(/^dot pitch$/i);
  const pixelCountText: HTMLElement = renderedComponent.getByText(/^pixel count$/i);
  expect(widthInput.title).toMatch(/^width$/i);
  expect(heightInput.title).toMatch(/^height$/i);
  expect(diagonalInput.title).toMatch(/^diagonal$/i);
  expect(aspectRatioText).toBeInTheDocument();
  expect(dpiText).toBeInTheDocument();
  expect(dotPitchText).toBeInTheDocument();
  expect(pixelCountText).toBeInTheDocument();
});
