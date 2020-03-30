import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../api';
import Favorites from './favorites.jsx';
import FavoritesEmpty from '../favorites-empty/favorites-empty.jsx';
import {ActionType} from '../../reducer/data/data';

Enzyme.configure({
  adapter: new Adapter(),
});

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    favorites: [],
  },
};

const expectedActions = [{type: ActionType.LOAD_FAVORITES}];

const store = mockStore(initialState, expectedActions);

it(`Should render FavoritesEmpty with favoritesList = []`, () => {
  const favoritesScreen = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Favorites
            userEmail={`someEmail@mail.su`}
            onFavoritesLoad={() => {}}
            onBookmarkClick={() => {}}
            onRentalCardHover={() => {}}
            favorites={[]}
          />
        </Provider>
      </MemoryRouter>
  );

  expect(favoritesScreen.find(FavoritesEmpty)).toHaveLength(1);
});
