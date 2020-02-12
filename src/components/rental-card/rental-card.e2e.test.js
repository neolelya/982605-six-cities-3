import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RentalCard from './rental-card';

const RENTAL_OFFER = {
  id: 1,
  rentalTitle: `Beautiful & luxurious apartment at great location`,
  rentalImage: `img/apartment-01.jpg`,
  rentalPrice: 120,
  rentalRating: `85%`,
  rentalType: `Apartment`,
  isPremium: true,
  isBookmark: true,
  onHeaderClick: () => {},
  onMouseLeave: () => {},
};

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should RentalCard handle onMouseEnter event`, () => {
  const onMouseEnter = jest.fn();

  const rentalCard = shallow(
      <RentalCard {...RENTAL_OFFER} onMouseEnter={onMouseEnter} />
  );

  const card = rentalCard.find(`.place-card`);
  card.props().onMouseEnter();

  expect(onMouseEnter.mock.calls.length).toBe(1);
});
