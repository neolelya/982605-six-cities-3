import React from 'react';
import {MemoryRouter} from 'react-router-dom';

import renderer from 'react-test-renderer';
import Property from './property.jsx';
import {TEST_OFFERS} from '../../tests-mocks';

it(`Should render Property correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Property
            offer={TEST_OFFERS[0].offers[0]}
            location={TEST_OFFERS[0].location}
            offers={TEST_OFFERS[0].offers}
            onHeaderClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
