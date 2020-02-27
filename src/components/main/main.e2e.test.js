import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {TEST_CITIES, TEST_OFFERS} from '../../tests-mocks';
import {CITIES} from '../../consts';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const handleHeaderClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          onHeaderClick={handleHeaderClick}
          cities={TEST_CITIES}
          currentCity={TEST_CITIES[3]}
          currentOffers={TEST_OFFERS}
          onCityClick={() => {}}
        />
      </MemoryRouter>
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => {
    return header.simulate(`click`);
  });

  expect(handleHeaderClick.mock.calls.length).toBe(
      TEST_OFFERS[0].offers.length
  );
});

it(`Should all the cities be clicked`, () => {
  const handleCityClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          onHeaderClick={() => {}}
          cities={TEST_CITIES}
          currentCity={TEST_CITIES[3]}
          currentOffers={TEST_OFFERS}
          onCityClick={handleCityClick}
        />
      </MemoryRouter>
  );

  const cities = mainScreen.find(`.locations__item-link`);

  cities.forEach((header) => {
    return header.simulate(`click`);
  });

  expect(handleCityClick.mock.calls.length).toBe(CITIES.length);
});
