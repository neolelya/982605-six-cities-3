import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';
import {RentalFeature, RentalType} from '../../consts';

const RENTAL_OFFER = {
  id: 1,
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
  rentalRating: 5,
  rentalType: RentalType.APARTMENT,
  isPremium: true,
  isBookmark: true,
  rentalDescription: `A bright and charming apartment with 1 bedroom, located close to Museum Square in one of the most cosmopolitan and vibrant districts of Amsterdam "de PIJP". Perfect for short holidays, business trips.`,
  rentalRoomsQuantity: 3,
  rentalMaxGuestsQuantity: 3,
  rentalFeatures: [RentalFeature.DRYER, RentalFeature.WASHINGMACHINE],
};

const OFFERS_DATA = [
  Object.assign({}, RENTAL_OFFER),
  Object.assign({}, RENTAL_OFFER, {
    id: 2,
    rentalHost: {
      hostName: `Angelina`,
      hostAvatar: `img/avatar-angelina.jpg`,
      isSuper: false,
    },
    rentalPrice: 15,
    rentalRating: 4.5,
    rentalType: RentalType.HOTEL,
    isPremium: false,
    isBookmark: true,
    rentalRoomsQuantity: 10,
    rentalMaxGuestsQuantity: 15,
    rentalFeatures: [],
  }),
  Object.assign({}, RENTAL_OFFER, {
    id: 3,
    rentalHost: {
      hostName: ` `,
      hostAvatar: ` `,
      isSuper: false,
    },
    rentalImages: [],
    rentalPrice: 0,
    rentalRating: 0,
    rentalType: RentalType.ROOM,
    isPremium: false,
    isBookmark: false,
    rentalRoomsQuantity: 0,
    rentalMaxGuestsQuantity: 0,
    rentalFeatures: [],
  }),
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const handleHeaderClick = jest.fn();

  const mainScreen = mount(
      <MemoryRouter>
        <Main
          rentalOfferCount={OFFERS_DATA.length}
          rentalOffers={OFFERS_DATA}
          onHeaderClick={handleHeaderClick}
        />
      </MemoryRouter>
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => header.simulate(`click`));

  expect(handleHeaderClick.mock.calls.length).toBe(OFFERS_DATA.length);
});
