import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Property from './property.jsx';
import {ALL_OFFERS, CITIES, OFFERS} from '../../tests-mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../api';
import thunk from 'redux-thunk';
import {ActionType} from '../../reducer/data/data';
import ReviewForm from '../review-form/review-form';

Enzyme.configure({
  adapter: new Adapter(),
});

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
    nearbyOffers: [],
    reviews: [],
    isSending: false,
  },
};

const expectedActions = [
  {type: ActionType.GET_REVIEWS},
  {type: ActionType.GET_NEARBY_OFFERS},
  {type: ActionType.POST_REVIEW},
];

const store = mockStore(initialState, expectedActions);

it(`Should not Property component show ReviewsForm to unauthorized user`, () => {
  const property = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Property
            userEmail={``}
            offer={OFFERS[0].offers[0]}
            location={OFFERS[0].location}
            offers={OFFERS[0].offers}
            activeCardCoordinates={[]}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
          />
        </Provider>
      </MemoryRouter>
  );

  expect(property.find(ReviewForm)).toHaveLength(0);
});

it(`Should Property component show ReviewsForm to authorized user`, () => {
  const property = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Property
            userEmail={`someEmail@mail.su`}
            offer={OFFERS[0].offers[0]}
            location={OFFERS[0].location}
            offers={OFFERS[0].offers}
            activeCardCoordinates={[]}
            onRentalCardHover={() => {}}
            onBookmarkClick={() => {}}
          />
        </Provider>
      </MemoryRouter>
  );

  expect(property.find(ReviewForm)).toHaveLength(1);
});
