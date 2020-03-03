import {reducer, ActionType, ActionCreator} from './reducer';
import {ALL_OFFERS, CITIES, OFFERS} from './tests-mocks';

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentCity: CITIES[3],
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    currentSortType: `Popular`,
    activeCardCoordinates: [],
  });
});

it(`Reducer should change city by a given city`, () => {
  expect(
      reducer(
          {
            currentCity: `Amsterdam`,
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            currentSortType: `Popular`,
            activeCardCoordinates: [],
          },
          {
            type: ActionType.CHANGE_CITY,
            payload: `Brussels`,
          }
      )
  ).toEqual({
    currentCity: `Brussels`,
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    currentSortType: `Popular`,
    activeCardCoordinates: [],
  });
});

it(`Reducer should get offers by a given offers`, () => {
  expect(
      reducer(
          {
            currentCity: CITIES[2],
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            currentSortType: `Popular`,
            activeCardCoordinates: [],
          },
          {
            type: ActionType.GET_OFFERS,
            payload: CITIES[2],
          }
      )
  ).toEqual({
    currentCity: CITIES[2],
    allOffers: ALL_OFFERS,
    currentOffers: [ALL_OFFERS[2]],
    cities: CITIES,
    currentSortType: `Popular`,
    activeCardCoordinates: [],
  });
});

it(`Reducer should change sort type by a given sort type`, () => {
  expect(
      reducer(
          {
            currentCity: CITIES[2],
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            currentSortType: `Popular`,
            activeCardCoordinates: [],
          },
          {
            type: ActionType.CHANGE_SORT_TYPE,
            payload: `Top rated first`,
          }
      )
  ).toEqual({
    currentCity: CITIES[2],
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    currentSortType: `Top rated first`,
    activeCardCoordinates: [],
  });
});

it(`Reducer should change active city coordinates by a given values`, () => {
  expect(
      reducer(
          {
            currentCity: CITIES[2],
            allOffers: ALL_OFFERS,
            currentOffers: OFFERS,
            cities: CITIES,
            currentSortType: `Popular`,
            activeCardCoordinates: [],
          },
          {
            type: ActionType.SET_ACTIVE_CARD,
            payload: [52.369553943508, 4.85309666406198],
          }
      )
  ).toEqual({
    currentCity: CITIES[2],
    allOffers: ALL_OFFERS,
    currentOffers: OFFERS,
    cities: CITIES,
    currentSortType: `Popular`,
    activeCardCoordinates: [52.369553943508, 4.85309666406198],
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

  it(`Action creator for changing sorting type correct action`, () => {
    expect(ActionCreator.changeSortType(`Top rated first`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Top rated first`,
    });
  });

  it(`Action creator for setting active city coordinates returns correct action`, () => {
    expect(ActionCreator.setActiveCard([123, 456])).toEqual({
      type: ActionType.SET_ACTIVE_CARD,
      payload: [123, 456],
    });
  });
});
