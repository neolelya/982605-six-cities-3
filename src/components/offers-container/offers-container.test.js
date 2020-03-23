import React from 'react';
import renderer from 'react-test-renderer';
import OffersContainer from './offers-container.jsx';
import {OFFERS} from '../../tests-mocks';
import {MemoryRouter} from 'react-router-dom';

it(`Should OffersContainer render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersContainer
            placesCount={OFFERS[0].offers.length}
            currentOffers={OFFERS}
            activeCardCoordinates={[]}
            currentSortType={`Popular`}
            onRentalCardHover={() => {}}
            onSortTypeClick={() => {}}
            onBookmarkClick={() => {}}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
