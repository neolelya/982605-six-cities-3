import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../api';
import Favorites from './favorites';
import {ActionType} from '../../reducer/data/data';
import {FAVORITE_RESPONSE, FavoriteOffer, USER_EMAIL, doNothing} from '../../tests-mocks';
import MockAdapter from 'axios-mock-adapter';

configure({
  adapter: new Adapter(),
});

const api = createAPI();
const apiMock = new MockAdapter(api);
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    favorites: [FavoriteOffer],
  },
};

const expectedActions = [{type: ActionType.LOAD_FAVORITES}, {type: ActionType.UPDATE_OFFER}];

const store = mockStore(initialState, expectedActions);
store.dispatch = jest.fn();

it(`Should Favorites delete offer from list by isBookmark click`, () => {
  apiMock
    .onPost(`/favorite/1/0`)
    .reply(200, Object.assign({}, FAVORITE_RESPONSE[0], {"is_favorite": false}));

  apiMock
    .onGet(`/favorite`)
    .reply(200, []);

  const favoritesScreen = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Favorites
            userEmail={USER_EMAIL}
            onRentalCardHover={doNothing}
            favorites={[FavoriteOffer]}
          />
        </Provider>
      </MemoryRouter>
  );

  const bookmarkButton = favoritesScreen.find(`.place-card__bookmark-button--active`);

  bookmarkButton.simulate(`click`);

  expect(store.dispatch).toHaveBeenCalledTimes(2);
});
