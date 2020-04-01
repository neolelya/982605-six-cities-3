import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesItem from './favorites-item.jsx';
import {CITIES, FavoriteOffer} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesItem
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            favoriteOffers={[FavoriteOffer]}
            favoriteCity={CITIES[0]}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
