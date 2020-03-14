import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app.jsx';
import {ALL_OFFERS, CITIES, OFFERS} from '../../tests-mocks';
import {createStore} from 'redux';

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
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

const reducer = (state = initialState) => {
  return state;
};

const store = createStore(reducer);

it(`Render App`, () => {
  const tree = renderer
    .create(
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
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
