import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesEmpty from './favorites-empty';

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
