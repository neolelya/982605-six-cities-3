import React from 'react';
import renderer from 'react-test-renderer';
import NoOffers from './no-offers.jsx';
import {CITIES} from '../../tests-mocks';

it(`Should NoOffers render correctly`, () => {
  const tree = renderer
    .create(<NoOffers currentCity={CITIES[0]} isError={false} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
