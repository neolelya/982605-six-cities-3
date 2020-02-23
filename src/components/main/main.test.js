import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Main from './main.jsx';
import {TEST_OFFERS} from '../../tests-mocks';

const OFFERS_DATA = TEST_OFFERS;

it(`Should render Main correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Main onHeaderClick={() => {}} rentalOffers={OFFERS_DATA} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
