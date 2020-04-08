import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import CitiesList from './cities-list';
import {CITIES} from '../../tests-mocks';

configure({
  adapter: new Adapter(),
});

it(`CitiesList handle onCityClick event`, () => {
  const onCityClick = jest.fn();

  const citiesList = mount(
      <MemoryRouter>
        <CitiesList
          cities={CITIES}
          currentCity={CITIES[0]}
          onCityClick={onCityClick}
        />
      </MemoryRouter>
  );

  const cities = citiesList.find(`.locations__item-link`);

  cities.at(1).simulate(`click`);

  expect(onCityClick).toHaveBeenCalledTimes(1);
  expect(onCityClick.mock.calls[0][0]).toBe(CITIES[1]);
});
