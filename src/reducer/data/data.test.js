import {reducer, ActionType, Operation} from '../data/data';
import {ALL_OFFERS, CITIES, COLOGNE_OFFERS, OFFERS} from '../../tests-mocks';
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
  });
});

it(`Reducer should update initial state by loaded data`, () => {
  expect(
      reducer(
          {allOffers: [], currentOffers: [], cities: [], isError: false},
          {type: ActionType.LOAD_OFFERS, payload: ALL_OFFERS}
      )
  ).toEqual({
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    isError: false,
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
});
