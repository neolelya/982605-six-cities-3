import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './app.jsx';
import {TEST_ALL_OFFERS, TEST_CITIES, TEST_OFFERS} from '../../tests-mocks';
import {createStore} from 'redux';

const initialState = {
  currentCity: TEST_CITIES[3],
  allOffers: TEST_ALL_OFFERS,
  currentOffers: TEST_OFFERS,
  cities: TEST_CITIES,
};

const reducer = (state = initialState) => {
  return state;
};

it(`Render App`, () => {
  const store = createStore(reducer);
  const tree = renderer
    .create(
        <MemoryRouter>
          <Provider store={store}>
            <App
              allOffers={TEST_ALL_OFFERS}
              cities={TEST_CITIES}
              currentOffers={TEST_OFFERS}
              currentCity={TEST_CITIES[3]}
              onCityClick={() => {}}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
