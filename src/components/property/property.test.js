import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import Property from './property.jsx';
import {OFFERS} from '../../tests-mocks';

it(`Should render Property correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Property
            offer={OFFERS[0].offers[0]}
            location={OFFERS[0].location}
            offers={OFFERS[0].offers}
            activeCardCoordinates={[]}
            onRentalCardHover={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
