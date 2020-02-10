import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Main from './main.jsx';

const RENTAL_TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Stylish and cozy place`,
  `Excellent location and free parking`,
];

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should all the headers be clicked`, () => {
  const headerClickHandler = jest.fn();

  const mainScreen = shallow(
      <Main
        rentalOffers={4}
        rentalTitles={RENTAL_TITLES}
        onHeaderClick={headerClickHandler}
      />
  );

  const rentalHeaders = mainScreen.find(`.place-card__name`);

  rentalHeaders.forEach((header) => header.props().onClick());

  expect(headerClickHandler.mock.calls.length).toBe(RENTAL_TITLES.length);
});
