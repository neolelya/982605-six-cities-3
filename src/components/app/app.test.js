import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import App from './app.jsx';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const OFFERS_DATA = TEST_OFFERS;

it(`Render App`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <App onHeaderClick={() => {}} rentalOffers={OFFERS_DATA} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
