import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import App from './app.jsx';
import Property from '../property/property.jsx';
import {ALL_OFFERS, CITIES, OFFERS} from '../../tests-mocks';
import {Provider} from 'react-redux';
import {createStore} from 'redux';

const initialState = {
  currentCity: OFFERS[0].location.city,
  allOffers: ALL_OFFERS,
  currentOffers: OFFERS,
  cities: CITIES,
  currentSortType: `Popular`,
  activeCardCoordinates: [],
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
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
