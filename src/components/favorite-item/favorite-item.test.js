import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesItem from './favorites-item.jsx';
import {FavoriteOffer} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesItem
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            favoriteOffers={[FavoriteOffer]}
            favoriteCity={`Amsterdam`}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
