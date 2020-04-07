import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Main from './main';
import {CITIES, OFFERS, doNothing} from '../../tests-mocks';
import {SortType} from '../../consts';

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main
            cities={CITIES}
            currentCity={CITIES[3]}
            currentOffers={OFFERS}
            onCityClick={doNothing}
            activeCardCoordinates={[]}
            currentSortType={SortType.POPULAR}
            onRentalCardHover={doNothing}
            onSortTypeClick={doNothing}
            isError={false}
            onBookmarkClick={doNothing}
            onUserEmailClick={doNothing}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render Main correctly with NoOffers component`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main
            cities={CITIES}
            currentCity={CITIES[3]}
            currentOffers={[]}
            onCityClick={doNothing}
            activeCardCoordinates={[]}
            currentSortType={SortType.POPULAR}
            onRentalCardHover={doNothing}
            onSortTypeClick={doNothing}
            isError={false}
            onBookmarkClick={doNothing}
            onUserEmailClick={doNothing}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
