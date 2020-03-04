import React from 'react';
import renderer from 'react-test-renderer';
import Map from './map.jsx';
import {OFFERS, OFFERS_COORDINATES} from '../../tests-mocks';

it(`Should render Map correctly`, () => {
  const tree = renderer
    .create(
        <Map
          location={OFFERS[0].location}
          offers={OFFERS[0].offers}
          offersCoordinates={OFFERS_COORDINATES}
          activeCardCoordinates={[]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
