import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {CITIES, OFFERS} from '../../tests-mocks';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const handleHeaderClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          onHeaderClick={handleHeaderClick}
          cities={CITIES}
          currentCity={CITIES[3]}
          currentOffers={OFFERS}
          onCityClick={() => {}}
          activeCardCoordinates={[]}
          currentSortType={`Popular`}
          onRentalCardHover={() => {}}
          onSortTypeClick={() => {}}
        />
      </MemoryRouter>
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => {
    return header.simulate(`click`);
  });

  expect(handleHeaderClick.mock.calls.length).toBe(OFFERS[0].offers.length);
});

it(`Should change active city by click`, () => {
  const handleCityClick = jest.fn();
  const activeCity = `Amsterdam`;

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          onHeaderClick={() => {}}
          cities={CITIES}
          currentCity={activeCity}
          currentOffers={OFFERS}
          onCityClick={handleCityClick}
          activeCardCoordinates={[]}
          currentSortType={`Popular`}
          onRentalCardHover={() => {}}
          onSortTypeClick={() => {}}
        />
      </MemoryRouter>
  );

  const cities = mainScreen.find(`.locations__item-link`);

  cities.at(0).simulate(`click`);

  expect(handleCityClick.mock.calls[0][1]).toBe(`Paris`);
  expect(handleCityClick.mock.calls[0][1]).not.toMatch(activeCity);
});
