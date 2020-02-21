import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const OFFERS_DATA = TEST_OFFERS;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const handleHeaderClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main rentalOffers={OFFERS_DATA} onHeaderClick={handleHeaderClick} />
      </MemoryRouter>
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => header.simulate(`click`));

  expect(handleHeaderClick.mock.calls.length).toBe(
      OFFERS_DATA[0].offers.length
  );
});
