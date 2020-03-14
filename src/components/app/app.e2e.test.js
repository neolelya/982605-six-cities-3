import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import App from './app.jsx';
import Property from '../property/property.jsx';
import {ALL_OFFERS, CITIES, OFFERS} from '../../tests-mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../api';
import thunk from 'redux-thunk';
import {ActionType} from '../../reducer/data/data';

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
    nearbyOffers: [],
    reviews: [],
  },
  APP: {
    currentCity: CITIES[3],
    currentSortType: `Popular`,
    activeCardCoordinates: [],
  },
  USER: {
    authorizationStatus: `UNAUTHORIZED`,
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
  const app = mount(
      <MemoryRouter>
        <Provider store={store}>
          <App
            allOffers={ALL_OFFERS}
            cities={CITIES}
            currentOffers={OFFERS}
            currentCity={CITIES[3]}
            onCityClick={() => {}}
            currentSortType={`Popular`}
            onSortTypeClick={() => {}}
            onRentalCardHover={() => {}}
            activeCardCoordinates={[]}
            login={() => {}}
          />
        </Provider>
      </MemoryRouter>
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
