import {reducer, ActionType, Operation} from '../data/data';
import {
  ALL_OFFERS,
  CITIES,
  COLOGNE_OFFERS,
  FAVORITE_OFFER,
  OFFERS,
} from '../../tests-mocks';
import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';

const api = createAPI();

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    allOffers: [],
    currentOffers: [],
    cities: [],
    reviews: [],
    nearbyOffers: [],
    isError: false,
    isSending: false,
    favorites: [],
  });
});

it(`Reducer should update initial state by loaded data`, () => {
  expect(
      reducer(
          {
            allOffers: [],
            currentOffers: [],
            cities: [],
            isError: false,
            isSending: false,
          },
          {type: ActionType.LOAD_OFFERS, payload: ALL_OFFERS}
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
    isSending: false,
  });
});

it(`Reducer should get offers by a given city`, () => {
  expect(
      reducer(
          {
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            isError: false,
            isSending: false,
          },
          {
            type: ActionType.GET_OFFERS,
            payload: `Cologne`,
          }
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: COLOGNE_OFFERS,
    cities: CITIES,
    isError: false,
    isSending: false,
  });
});

it(`Reducer should set isSending true due to post process`, () => {
  expect(
      reducer(
          {
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            isError: false,
            isSending: false,
          },
          {
            type: ActionType.SET_SENDING,
            payload: true,
          }
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
    isSending: true,
  });
});

it(`Reducer should add comment to reviewsList by posting new comment`, () => {
  expect(
      reducer(
          {
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            reviews: [],
            isError: false,
            isSending: false,
          },
          {
            type: ActionType.POST_REVIEW,
            payload: [`Breathtaking review`],
          }
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    reviews: [`Breathtaking review`],
    isError: false,
    isSending: false,
  });
});

it(`Reducer should add offer to favorites by loading data`, () => {
  expect(
      reducer(
          {
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            favorites: [],
          },
          {
            type: ActionType.LOAD_FAVORITES,
            payload: [FAVORITE_OFFER],
          }
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    favorites: [FAVORITE_OFFER],
  });
});

describe(`Operation should work correctly`, () => {
  it(`Should make a correct API call to /hotels`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadOffers();

    apiMock.onGet(`/hotels`).reply(200, []);

    return loadOffers(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.LOAD_OFFERS,
        payload: [],
      });
    });
  });

  it(`Should get an error with API call`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const loadOffers = Operation.loadOffers();

    apiMock.onGet(`/hotels`).reply(404, []);

    return loadOffers(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_ERROR,
        payload: true,
      });
    });
  });

  it(`Should make a correct API call to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getReviews = Operation.getReviews(1);

    apiMock.onGet(`/comments/1`).reply(200, []);

    return getReviews(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_REVIEWS,
        payload: [],
      });
    });
  });

  it(`Should make a correct API call to /hotels/:id/nearby`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const getNearbyOffers = Operation.getNearbyOffers(1);

    apiMock.onGet(`/hotels/1/nearby`).reply(200, []);

    return getNearbyOffers(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(1);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.GET_NEARBY_OFFERS,
        payload: [],
      });
    });
  });

  it(`Should make a correct API call for post review to /comments/:id`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();

    const review = {
      id: 1,
      user: {
        id: 1,
        name: `The most beautiful name of the world`,
        avatar: undefined,
        isPro: undefined,
      },
      rating: 5,
      comment: `The building is in between the beach and metro station, 5 mins walking distance to both`,
      date: new Date(`Mar 19 2020`),
    };

    const postReview = Operation.postReview(1, review);

    apiMock.onPost(`/comments/1`).reply(200, [review]);

    return postReview(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.SET_SENDING,
        payload: true,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.GET_REVIEWS,
        payload: [review],
      });

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.SET_SENDING,
        payload: false,
      });
    });
  });
});
