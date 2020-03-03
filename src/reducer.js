import {getOffersByCity, getUniqueCities} from './utils';
import {City} from './consts';
import {SortType} from './consts';
import allOffers from './mocks/all-offers';

const cities = getUniqueCities(allOffers);

const initialState = {
  currentCity: City.AMSTERDAM,
  allOffers,
  currentOffers: getOffersByCity(City.AMSTERDAM, allOffers),
  cities,
  currentSortType: SortType.POPULAR,
  activeCardCoordinates: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (city) => ({
    type: ActionType.GET_OFFERS,
    payload: city,
  }),
  changeSortType: (sortType) => ({
    type: ActionType.CHANGE_SORT_TYPE,
    payload: sortType,
  }),
  setActiveCard: (coordinates) => ({
    type: ActionType.SET_ACTIVE_CARD,
    payload: coordinates,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {currentCity: action.payload});

    case ActionType.GET_OFFERS:
      return Object.assign({}, state, {
        currentOffers: getOffersByCity(action.payload, state.allOffers),
      });

    case ActionType.CHANGE_SORT_TYPE:
      return Object.assign({}, state, {currentSortType: action.payload});

    case ActionType.SET_ACTIVE_CARD:
      return Object.assign({}, state, {
        activeCardCoordinates: action.payload,
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
