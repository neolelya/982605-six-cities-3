import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Map from './map';
import {OFFERS, OFFERS_COORDINATES} from '../../tests-mocks';

it(`Should render Map correctly`, () => {
  const tree = renderer
    .create(
        <Map
          location={OFFERS[0].location}
          offersCoordinates={OFFERS_COORDINATES}
          activeCardCoordinates={[]}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
