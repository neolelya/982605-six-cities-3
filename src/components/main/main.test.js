import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Main from './main.jsx';
import {CITIES, OFFERS} from '../../tests-mocks';

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main
            cities={CITIES}
            currentCity={CITIES[3]}
            currentOffers={OFFERS}
            onCityClick={() => {}}
            activeCardCoordinates={[]}
            currentSortType={`Popular`}
            onRentalCardHover={() => {}}
            onSortTypeClick={() => {}}
            isError={false}
            onBookmarkClick={() => {}}
            onUserEmailClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
