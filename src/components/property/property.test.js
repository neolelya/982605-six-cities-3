import React from 'react';
import {MemoryRouter} from 'react-router-dom';
import renderer from 'react-test-renderer';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {Provider} from 'react-redux';
import Property from './property.jsx';
import {OFFERS} from '../../tests-mocks';
import {ActionType} from '../../reducer/data/data';
import {createAPI} from '../../api';

const api = createAPI();
const mockStore = configureStore([thunk.withExtraArgument(api)]);

const initialState = {
  DATA: {
    reviews: [],
    nearbyOffers: [],
    isError: false,
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

it(`Should render Property correctly`, () => {
  const tree = renderer
    .create(
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
              onUserEmailClick={() => {}}
            />
          </Provider>
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
