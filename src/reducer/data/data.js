import {getOffersByCity, getUniqueCities, offersAdapter} from '../../utils';
import {City} from '../../consts';

const initialState = {
  allOffers: [],
  currentOffers: [],
  cities: [],
  isError: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  GET_OFFERS: `GET_OFFERS`,
  SET_ERROR: `SET_ERROR`,
};

const ActionCreator = {
  loadOffers: (offers) => ({
    type: ActionType.LOAD_OFFERS,
    payload: offers,
  }),
  getOffers: (city) => ({
    type: ActionType.GET_OFFERS,
    payload: city,
  }),
  setError: (isError) => ({
    type: ActionType.SET_ERROR,
    payload: isError,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.LOAD_OFFERS:
      return Object.assign({}, state, {
        allOffers: action.payload,
        currentOffers: getOffersByCity(City.AMSTERDAM, action.payload),
        cities: getUniqueCities(action.payload),
      });

    case ActionType.GET_OFFERS:
      return Object.assign({}, state, {
        currentOffers: getOffersByCity(action.payload, state.allOffers),
      });

    case ActionType.SET_ERROR:
      return Object.assign({}, state, {
        isError: action.payload,
      });
  }

  return state;
};

const Operation = {
  loadOffers: () => (dispatch, getState, api) => {
    return api
      .get(`/hotels`)
      .then((response) => {
        dispatch(
            ActionCreator.loadOffers(
                response.data.map((offer) => offersAdapter(offer))
            )
        );
      })
      .catch(() => {
        dispatch(ActionCreator.setError(true));
      });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
