import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import RentalCard from './rental-card.jsx';
import {RentalFeature, RentalType} from '../../consts';

const RENTAL_OFFER = {
  id: 0,
  rentalHost: {
    hostName: `Angelina`,
    hostAvatar: `img/avatar-angelina.jpg`,
    isSuper: true,
  },
  rentalTitle: `Beautiful & luxurious apartment at great location`,
  rentalImages: [
    `img/apartment-01.jpg`,
    `img/apartment-02.jpg`,
    `img/apartment-03.jpg`,
    `img/apartment-small-03.jpg`,
    `img/apartment-small-04.jpg`,
  ],
  rentalPrice: 120,
  rentalRating: 3.4,
  rentalType: RentalType.APARTMENT,
  isPremium: true,
  isBookmark: true,
  rentalDescription: `A bright and charming apartment with 1 bedroom, located close to Museum Square in one of the most cosmopolitan and vibrant districts of Amsterdam "de PIJP". Perfect for short holidays, business trips.`,
  rentalRoomsQuantity: 3,
  rentalMaxGuestsQuantity: 3,
  rentalFeatures: [RentalFeature.DRYER, RentalFeature.WASHINGMACHINE],
  onHeaderClick: () => {},
  onMouseEnter: () => {},
  onMouseLeave: () => {},
};

it(`Should render RentalCard correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <RentalCard {...RENTAL_OFFER} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
