import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './app.jsx';
import Property from '../property/property.jsx';
import {ALL_OFFERS, CITIES} from '../../tests-mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../api';
import thunk from 'redux-thunk';
import {ActionType} from '../../reducer/data/data';
import {AuthorizationStatus, SortType} from '../../consts';

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: [ALL_OFFERS[0]],
    cities: CITIES,
    isError: false,
    nearbyOffers: [],
    reviews: [],
    isSending: false,
    favorites: [],
  },
  APP: {
    currentCity: CITIES[0],
    currentSortType: SortType.POPULAR,
    activeCardCoordinates: [],
  },
  USER: {
    authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
    isLoginError: false,
    userEmail: ``,
  },
};

const expectedActions = [
  {type: ActionType.GET_REVIEWS},
  {type: ActionType.GET_NEARBY_OFFERS},
];

const store = mockStore(initialState, expectedActions);

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should render Property component from App component`, () => {
  window.scrollTo = jest.fn();
  const app = mount(
      <MemoryRouter>
        <Provider store={store}>
          <App
            allOffers={ALL_OFFERS}
            cities={CITIES}
            currentOffers={[ALL_OFFERS[0]]}
            currentCity={CITIES[0]}
            onCityClick={() => {}}
            currentSortType={SortType.POPULAR}
            onSortTypeClick={() => {}}
            onRentalCardHover={() => {}}
            activeCardCoordinates={[]}
            onLogin={() => {}}
          />
        </Provider>
      </MemoryRouter>
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
