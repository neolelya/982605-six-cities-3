import React from 'react';
import renderer from 'react-test-renderer';
import App from './app.jsx';

const RENTAL_OFFERS = [
  {
    id: 1,
    rentalTitle: `Beautiful & luxurious apartment at great location`,
    rentalImage: `img/apartment-01.jpg`,
    rentalPrice: 120,
    rentalRating: `85%`,
    rentalType: `Apartment`,
    isPremium: true,
    isBookmark: false,
  },
  {
    id: 2,
    rentalTitle: `Wood and stone place`,
    rentalImage: `img/apartment-02.jpg`,
    rentalPrice: 80,
    rentalRating: `79%`,
    rentalType: `Hostel`,
    isPremium: false,
    isBookmark: false,
  },
  {
    id: 3,
    rentalTitle: `Stylish and cozy place`,
    rentalImage: `img/studio-01.jpg`,
    rentalPrice: 132,
    rentalRating: `90%`,
    rentalType: `House`,
    isPremium: true,
    isBookmark: true,
  },
  {
    id: 4,
    rentalTitle: `Excellent location and free parking`,
    rentalImage: `img/apartment-03.jpg`,
    rentalPrice: 180,
    rentalRating: `98%`,
    rentalType: `Apartment`,
    isPremium: true,
    isBookmark: false,
  },
];

it(`Render App`, () => {
  const tree = renderer
    .create(
        <App
          rentalOfferCount={RENTAL_OFFERS.length}
          onHeaderClick={() => {}}
          rentalOffers={RENTAL_OFFERS}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
