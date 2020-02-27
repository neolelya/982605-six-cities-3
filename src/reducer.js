import {getOffersByCity, getUniqueCities} from './utils';
import {City} from './consts';
import allOffers from './mocks/all-offers';

const cities = getUniqueCities(allOffers);

const initialState = {
  currentCity: City.AMSTERDAM,
  allOffers,
  currentOffers: getOffersByCity(City.AMSTERDAM, allOffers),
  cities,
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  GET_OFFERS: `GET_OFFERS`,
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
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return Object.assign({}, state, {currentCity: action.payload});

    case ActionType.GET_OFFERS:
      return Object.assign({}, state, {
        currentOffers: getOffersByCity(action.payload, state.allOffers),
      });
  }

  return state;
};

export {reducer, ActionType, ActionCreator};
