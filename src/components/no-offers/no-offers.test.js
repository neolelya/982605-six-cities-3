import React from 'react';
import renderer from 'react-test-renderer';
import NoOffers from './no-offers.jsx';

it(`Should NoOffers render correctly`, () => {
  const tree = renderer.create(<NoOffers />).toJSON();

  expect(tree).toMatchSnapshot();
});
