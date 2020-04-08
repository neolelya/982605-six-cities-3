import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import FavoritesItem from './favorites-item';
import {CITIES, FavoriteOffer, doNothing} from '../../tests-mocks';

it(`Should FavoriteItem render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <FavoritesItem
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            favoriteOffers={[FavoriteOffer]}
            favoriteCity={CITIES[0]}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
