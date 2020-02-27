import {reducer, ActionType, ActionCreator} from './reducer';
import {TEST_ALL_OFFERS, TEST_CITIES, TEST_OFFERS} from './tests-mocks';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentCity: TEST_CITIES[3],
    allOffers: TEST_ALL_OFFERS,
    currentOffers: TEST_OFFERS,
    cities: TEST_CITIES,
  });
});

it(`Reducer should change city by a given city`, () => {
  expect(
      reducer(
          {
            currentCity: TEST_CITIES[3],
            allOffers: TEST_ALL_OFFERS,
            currentOffers: TEST_OFFERS,
            cities: TEST_CITIES,
          },
          {
            type: ActionType.CHANGE_CITY,
            payload: `Brussels`,
          }
      )
  ).toEqual({
    currentCity: TEST_CITIES[2],
    allOffers: TEST_ALL_OFFERS,
    currentOffers: TEST_OFFERS,
    cities: TEST_CITIES,
  });
});

it(`Reducer should get offers by a given offers`, () => {
  expect(
      reducer(
          {
            currentCity: TEST_CITIES[2],
            allOffers: TEST_ALL_OFFERS,
            currentOffers: TEST_OFFERS,
            cities: TEST_CITIES,
          },
          {
            type: ActionType.GET_OFFERS,
            payload: TEST_CITIES[2],
          }
      )
  ).toEqual({
    currentCity: TEST_CITIES[2],
    allOffers: TEST_ALL_OFFERS,
    currentOffers: [TEST_ALL_OFFERS[2]],
    cities: TEST_CITIES,
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for changing city returns correct action`, () => {
    expect(ActionCreator.changeCity(`Brussels`)).toEqual({
      type: ActionType.CHANGE_CITY,
      payload: `Brussels`,
    });
  });

  it(`Action creator for getting offers returns correct action`, () => {
    expect(ActionCreator.getOffers(`Brussels`)).toEqual({
      type: ActionType.GET_OFFERS,
      payload: `Brussels`,
    });
  });
});
