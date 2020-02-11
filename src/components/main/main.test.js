import React from 'react';
import renderer from 'react-test-renderer';
import Main from './main.jsx';

const RENTAL_TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Stylish and cozy place`,
  `Excellent location and free parking`,
];

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create(
        <Main
          rentalOffers={4}
          rentalTitles={RENTAL_TITLES}
          onHeaderClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
