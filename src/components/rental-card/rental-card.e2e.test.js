import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RentalCard from './rental-card';
import {OFFERS} from '../../tests-mocks';

const RENTAL_OFFER = OFFERS[0].offers[0];

Enzyme.configure({
  adapter: new Adapter(),
});

describe(`RentalCard handlers work correctly`, () => {
  it(`with click events`, () => {
    const onHeaderClick = jest.fn();

    const rentalCard = shallow(
        <RentalCard
          {...RENTAL_OFFER}
          onMouseLeave={() => {}}
          onMouseEnter={() => {}}
          onHeaderClick={onHeaderClick}
          onRentalCardHover={() => {}}
        />
    );

    const header = rentalCard.find(`.place-card__name`);

    header.simulate(`click`);

    expect(onHeaderClick).toHaveBeenCalledTimes(1);
  });

  it(`with onMouseEnter events`, () => {
    const onMouseEnter = jest.fn();

    const rentalCard = shallow(
        <RentalCard
          {...RENTAL_OFFER}
          onMouseLeave={() => {}}
          onMouseEnter={onMouseEnter}
          onHeaderClick={() => {}}
          onRentalCardHover={() => {}}
        />
    );

    const card = rentalCard.find(`.place-card`);

    card.simulate(`mouseenter`);

    expect(onMouseEnter).toHaveBeenCalledTimes(1);
  });

  it(`with onRentalCardHover events`, () => {
    const onRentalCardHover = jest.fn();

    const rentalCard = shallow(
        <RentalCard
          {...RENTAL_OFFER}
          onMouseLeave={() => {}}
          onMouseEnter={() => {}}
          onHeaderClick={() => {}}
          onRentalCardHover={onRentalCardHover}
        />
    );

    const card = rentalCard.find(`.place-card`);

    card.simulate(`mouseenter`);

    expect(onRentalCardHover).toHaveBeenCalledTimes(1);
    expect(Array.isArray(onRentalCardHover.mock.calls)).toBe(true);
    expect(onRentalCardHover.mock.calls.length).toBe(1);
    expect(onRentalCardHover.mock.calls[0][0].length).toEqual(
        RENTAL_OFFER.coordinates.length
    );
  });
});
