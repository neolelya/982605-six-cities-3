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
  it(`with onRentalCardHover events`, () => {
    const onRentalCardHover = jest.fn();

    const rentalCard = shallow(
        <RentalCard
          {...RENTAL_OFFER}
          onRentalCardHover={onRentalCardHover}
          onBookmarkClick={() => {}}
        />
    );

    const card = rentalCard.find(`.place-card`);

    card.simulate(`mouseenter`);

    expect(onRentalCardHover).toHaveBeenCalledTimes(1);
    expect(Array.isArray(onRentalCardHover.mock.calls)).toBe(true);
    expect(onRentalCardHover.mock.calls.length).toBe(1);
    expect(onRentalCardHover.mock.calls[0][0][0]).toEqual(
        RENTAL_OFFER.coordinates.latitude
    );
    expect(onRentalCardHover.mock.calls[0][0][1]).toEqual(
        RENTAL_OFFER.coordinates.longitude
    );
  });

  it(`with onBookmarkClick events`, () => {
    const onBookmarkClick = jest.fn();

    const rentalCard = shallow(
        <RentalCard
          {...RENTAL_OFFER}
          onRentalCardHover={() => {}}
          onBookmarkClick={onBookmarkClick}
        />
    );

    const bookmark = rentalCard.find(`.place-card__bookmark-button`);

    bookmark.simulate(`click`);

    expect(onBookmarkClick).toHaveBeenCalledTimes(1);
  });
});
