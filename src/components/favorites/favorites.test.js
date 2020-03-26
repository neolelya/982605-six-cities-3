import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Favorites from './favorites.jsx';

it(`Should Favorites render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Favorites userEmail={`SomeEmail`} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
