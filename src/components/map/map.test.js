import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';
import {TEST_OFFERS, TEST_OFFERS_COORDINATES} from '../../tests-mocks';

it(`Should render Map correctly`, () => {
  const tree = renderer
    .create(
        <Map
          location={TEST_OFFERS[0].location}
          offers={TEST_OFFERS[0].offers}
          offersCoordinates={TEST_OFFERS_COORDINATES}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
