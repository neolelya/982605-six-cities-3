import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import RentalCard from './rental-card.jsx';
import {OFFERS} from '../../tests-mocks';
import {ClassName} from '../../consts';

const RENTAL_OFFER = OFFERS[0].offers[0];

it(`Should render RentalCard correctly with FAVORITES class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard
            {...RENTAL_OFFER}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.FAVORITES}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with CITY class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard
            {...RENTAL_OFFER}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.CITY}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with NEAR_PLACES class`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard
            {...RENTAL_OFFER}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.NEAR_PLACES}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with isPremium = false`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard
            {...RENTAL_OFFER}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.NEAR_PLACES}
            isPremium={false}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render RentalCard correctly with isBookmark = false`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard
            {...RENTAL_OFFER}
            onMouseLeave={() => {}}
            onMouseEnter={() => {}}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
            pageClass={ClassName.NEAR_PLACES}
            isBookmark={false}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
