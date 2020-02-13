import React from 'react';
import renderer from 'react-test-renderer';
import RentalCard from './rental-card.jsx';

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
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

it(`Should render RentalCard correctly`, () => {
  const tree = renderer.create(<RentalCard {...RENTAL_OFFER} />).toJSON();

  expect(tree).toMatchSnapshot();
});
