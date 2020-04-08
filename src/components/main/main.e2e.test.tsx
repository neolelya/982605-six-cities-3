import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import Main from './main';
import {CITIES, OFFERS, doNothing} from '../../tests-mocks';
import {SortType} from '../../consts';

configure({
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
          onRentalCardHover={doNothing}
          onSortTypeClick={doNothing}
          isError={false}
          onBookmarkClick={doNothing}
          onUserEmailClick={doNothing}
        />
      </MemoryRouter>
  );

  const cities = mainScreen.find(`.locations__item-link`);

  cities.at(1).simulate(`click`);

  expect(handleCityClick.mock.calls[0][0]).toBe(CITIES[1]);
  expect(handleCityClick.mock.calls[0][0]).not.toMatch(activeCity);
});
