import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import OffersList from './offers-list.jsx';
import {TEST_OFFERS} from '../../tests-mocks';

const RENTAL_OFFER = TEST_OFFERS[0].offers;

it(`Should render OffersList correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <OffersList rentalCardsList={RENTAL_OFFER} onHeaderClick={() => {}} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
