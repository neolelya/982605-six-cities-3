import * as React from 'react';
import * as renderer from 'react-test-renderer';
import CitiesList from './cities-list';
import {CITIES, doNothing} from '../../tests-mocks';

it(`Should CitiesList render correctly`, () => {
  const tree = renderer
    .create(
        <CitiesList
          cities={CITIES}
          currentCity={CITIES[0]}
          onCityClick={doNothing}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
