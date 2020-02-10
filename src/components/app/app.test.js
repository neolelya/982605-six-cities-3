import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const RENTAL_TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Stylish and cozy place`,
  `Excellent location and free parking`,
];

it(`Render App`, () => {
  const tree = renderer
    .create(<App rentalOffers={4} rentalTitles={RENTAL_TITLES} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
