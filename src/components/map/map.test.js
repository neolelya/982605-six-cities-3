import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const OFFERS_DATA = TEST_OFFERS[0];

it(`Should render Map correctly`, () => {
  const tree = renderer
    .create(<Map location={OFFERS_DATA.location} offers={OFFERS_DATA.offers} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
