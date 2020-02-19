import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RentalCard from './rental-card';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const RENTAL_OFFER = TEST_OFFERS[0].offers[0];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should RentalCard handle onMouseEnter and click events`, () => {
  const onMouseEnter = jest.fn();
  const onHeaderClick = jest.fn();

  const rentalCard = shallow(
      <RentalCard
        {...RENTAL_OFFER}
        onMouseLeave={() => {}}
        onMouseEnter={onMouseEnter}
        onHeaderClick={onHeaderClick}
      />
  );

  const card = rentalCard.find(`.place-card`);
  const header = rentalCard.find(`.place-card__name`);

  card.simulate(`mouseenter`);
  header.simulate(`click`);

  expect(onMouseEnter).toHaveBeenCalledTimes(1);
  expect(onHeaderClick).toHaveBeenCalledTimes(1);
});
