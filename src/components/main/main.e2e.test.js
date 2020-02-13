import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const RENTAL_OFFERS = [
  {
    id: 1,
    rentalTitle: `Beautiful & luxurious apartment at great location`,
    rentalImage: `img/apartment-01.jpg`,
    rentalPrice: 120,
    rentalRating: `85%`,
    rentalType: `Apartment`,
    isPremium: Boolean(Math.round(Math.random())),
    isBookmark: Boolean(Math.round(Math.random())),
  },
  {
    id: 2,
    rentalTitle: `Wood and stone place`,
    rentalImage: `img/apartment-02.jpg`,
    rentalPrice: 80,
    rentalRating: `79%`,
    rentalType: `Hostel`,
    isPremium: Boolean(Math.round(Math.random())),
    isBookmark: Boolean(Math.round(Math.random())),
  },
  {
    id: 3,
    rentalTitle: `Stylish and cozy place`,
    rentalImage: `img/studio-01.jpg`,
    rentalPrice: 132,
    rentalRating: `90%`,
    rentalType: `House`,
    isPremium: Boolean(Math.round(Math.random())),
    isBookmark: Boolean(Math.round(Math.random())),
  },
  {
    id: 4,
    rentalTitle: `Excellent location and free parking`,
    rentalImage: `img/apartment-03.jpg`,
    rentalPrice: 180,
    rentalRating: `98%`,
    rentalType: `Apartment`,
    isPremium: Boolean(Math.round(Math.random())),
    isBookmark: Boolean(Math.round(Math.random())),
  },
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const handleHeaderClick = jest.fn();

  const mainScreen = mount(
      <Main
        rentalOfferCount={RENTAL_OFFERS.length}
        rentalOffers={RENTAL_OFFERS}
        onHeaderClick={handleHeaderClick}
      />
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => header.props().onClick());

  expect(handleHeaderClick.mock.calls.length).toBe(RENTAL_OFFERS.length);
});
