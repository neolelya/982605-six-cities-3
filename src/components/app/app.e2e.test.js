import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import App from './app.jsx';
import Property from '../property/property.jsx';
import {TEST_ALL_OFFERS, TEST_CITIES, TEST_OFFERS} from '../../tests-mocks';
import {Provider} from 'react-redux';
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

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should render Property component from App component`, () => {
  const store = createStore(reducer);
  const app = mount(
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
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
