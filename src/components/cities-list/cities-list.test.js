import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import {CITIES} from '../../tests-mocks';

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={CITIES}
          currentCity={CITIES[0]}
          onCityClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
