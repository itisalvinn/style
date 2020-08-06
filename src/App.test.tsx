import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  // const { getByText } = render(<App />);
  // const linkElement = getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
});

test('renders menu elements', () =>{
  const {getByText} = render(<App/>);

  const topElement = getByText(/top/i);
  const bottomElement = getByText(/bottom/i);
  const shoesElement = getByText(/shoes/i);
  const hatElement = getByText(/hat/i);

  expect(topElement).toBeInTheDocument();
  expect(bottomElement).toBeInTheDocument();
  expect(shoesElement).toBeInTheDocument();
  expect(hatElement).toBeInTheDocument();
});