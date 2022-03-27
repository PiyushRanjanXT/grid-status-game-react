import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders Grid State Game', () => {
  render(<App />);
  const linkElement = screen.getByText(/Grid State Game/i);
  expect(linkElement).toBeInTheDocument();
});

