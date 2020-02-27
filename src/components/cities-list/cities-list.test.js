import React from 'react';
import renderer from 'react-test-renderer';
import CitiesList from './cities-list.jsx';
import {TEST_CITIES} from '../../tests-mocks';

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={TEST_CITIES}
          currentCity={TEST_CITIES[3]}
          onCityClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
