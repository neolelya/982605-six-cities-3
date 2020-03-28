import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesItem from './favorites-item.jsx';
import {FAVORITE_OFFER} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesItem
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            favoriteOffers={[FAVORITE_OFFER]}
            favoriteCity={`Amsterdam`}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
