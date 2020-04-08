import * as React from 'react';
import * as renderer from 'react-test-renderer';
import OffersContainer from './offers-container';
import {OFFERS, doNothing} from '../../tests-mocks';
import {MemoryRouter} from 'react-router-dom';
import {ClassName, SortType} from '../../consts';

it(`Should OffersContainer render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersContainer
            placesCount={OFFERS[0].offers.length}
            currentOffers={OFFERS}
            activeCardCoordinates={[]}
            currentSortType={SortType.POPULAR}
            onRentalCardHover={doNothing}
            onSortTypeClick={doNothing}
            onBookmarkClick={doNothing}
            pageClass={ClassName.CITY}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
