import React from 'react';
import Enzyme, {mount} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {MemoryRouter} from 'react-router-dom';
import App from './app.jsx';
import Property from '../property/property.jsx';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const OFFERS_DATA = TEST_OFFERS;

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should render Property component from App component`, () => {
  const app = mount(
      <MemoryRouter>
        <App rentalOffers={OFFERS_DATA} />
      </MemoryRouter>
  );

  const headers = app.find(`.place-card__name a`);

  headers.at(0).simulate(`click`, {button: 0});

  expect(app.find(Property)).toHaveLength(1);
});
