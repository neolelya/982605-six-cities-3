import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {CITIES, OFFERS} from '../../tests-mocks';
import {SortType} from '../../consts';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should change active city by click`, () => {
  const handleCityClick = jest.fn();
  const activeCity = CITIES[0];

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          cities={CITIES}
          currentCity={activeCity}
          currentOffers={OFFERS}
          onCityClick={handleCityClick}
          activeCardCoordinates={[]}
          currentSortType={SortType.POPULAR}
          onRentalCardHover={() => {}}
          onSortTypeClick={() => {}}
          isError={false}
          onBookmarkClick={() => {}}
          onUserEmailClick={() => {}}
        />
      </MemoryRouter>
  );

  const cities = mainScreen.find(`.locations__item-link`);

  cities.at(1).simulate(`click`);

  expect(handleCityClick.mock.calls[0][0]).toBe(CITIES[1]);
  expect(handleCityClick.mock.calls[0][0]).not.toMatch(activeCity);
});
