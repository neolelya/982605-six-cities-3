import React from 'react';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import {createAPI} from '../../api';
import {MemoryRouter} from 'react-router-dom';
import Favorites from './favorites.jsx';
import {OFFERS, USER_EMAIL} from '../../tests-mocks';
import {ActionType} from '../../reducer/data/data';

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    favorites: [],
  },
};

const expectedActions = [{type: ActionType.LOAD_FAVORITES}];

const store = mockStore(initialState, expectedActions);

it(`Should Favorites render correctly with favoritesList data`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <Favorites
              userEmail={USER_EMAIL}
              favorites={OFFERS[0]}
              onRentalCardHover={() => {}}
              onBookmarkClick={() => {}}
              onFavoritesLoad={() => {}}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Favorites render correctly with favoritesList = []`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <Favorites
              userEmail={USER_EMAIL}
              favorites={[]}
              onRentalCardHover={() => {}}
              onBookmarkClick={() => {}}
              onFavoritesLoad={() => {}}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
