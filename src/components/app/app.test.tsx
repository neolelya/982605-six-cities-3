import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app';
import {ALL_OFFERS, CITIES, OFFERS, doNothing} from '../../tests-mocks';
import {createStore} from 'redux';
import {AuthorizationStatus, SortType} from '../../consts';

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
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
              currentCity={CITIES[0]}
              onCityClick={doNothing}
              currentSortType={SortType.POPULAR}
              onSortTypeClick={doNothing}
              onRentalCardHover={doNothing}
              activeCardCoordinates={[]}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
