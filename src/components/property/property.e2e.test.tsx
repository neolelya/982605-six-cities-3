import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import configureStore from 'redux-mock-store';
import Property from './property';
import {ALL_OFFERS, CITIES, OFFERS, USER_EMAIL, doNothing} from '../../tests-mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../api';
import thunk from 'redux-thunk';
import {ActionType} from '../../reducer/data/data';
import ReviewForm from '../review-form/review-form';

configure({
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
    favorites: [],
  },
};

const expectedActions = [
  {type: ActionType.GET_REVIEWS},
  {type: ActionType.GET_NEARBY_OFFERS},
  {type: ActionType.POST_REVIEW},
  {type: ActionType.LOAD_FAVORITES},
];

const store = mockStore(initialState, expectedActions);

it(`Should not Property component show ReviewsForm to unauthorized user`, () => {
  window.scrollTo = jest.fn();
  const property = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Property
            userEmail={``}
            offer={OFFERS[0].offers[0]}
            location={OFFERS[0].location}
            offers={OFFERS[0].offers}
            activeCardCoordinates={[]}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            onUserEmailClick={doNothing}
          />
        </Provider>
      </MemoryRouter>
  );

  expect(property.find(ReviewForm)).toHaveLength(0);
});

it(`Should Property component show ReviewsForm to authorized user`, () => {
  window.scrollTo = jest.fn();
  const property = mount(
      <MemoryRouter>
        <Provider store={store}>
          <Property
            userEmail={USER_EMAIL}
            offer={OFFERS[0].offers[0]}
            location={OFFERS[0].location}
            offers={OFFERS[0].offers}
            activeCardCoordinates={[]}
            onRentalCardHover={doNothing}
            onBookmarkClick={doNothing}
            onUserEmailClick={doNothing}
          />
        </Provider>
      </MemoryRouter>
  );

  expect(property.find(ReviewForm)).toHaveLength(1);
});
