import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesEmpty from './favorites-empty.jsx';

it(`Should FavoritesEmpty render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesEmpty />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
