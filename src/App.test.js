/* eslint-disable no-undef */
import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  const { getByText } = render(<App />);
  const linkElement = getByText(
    'Disulfide bond and Glycoslyation Visualization'
  );
  expect(linkElement).toBeInTheDocument();
});
