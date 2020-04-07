import * as React from 'react';
import * as renderer from 'react-test-renderer';
import NoOffers from './no-offers';
import {CITIES} from '../../tests-mocks';

it(`Should NoOffers render correctly`, () => {
  const tree = renderer
    .create(<NoOffers currentCity={CITIES[0]} isError={false} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
