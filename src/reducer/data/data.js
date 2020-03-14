import {
  getOffersByCity,
  getUniqueCities,
  offersAdapter,
  reviewsAdapter,
} from '../../utils';
import {City, OffersRestriction} from '../../consts';

const initialState = {
  allOffers: [],
  currentOffers: [],
  cities: [],
  reviews: [],
  nearbyOffers: [],
  isError: false,
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  GET_OFFERS: `GET_OFFERS`,
  SET_ERROR: `SET_ERROR`,
  GET_REVIEWS: `GET_REVIEWS`,
  GET_NEARBY_OFFERS: `GET_NEARBY_OFFERS`,
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
  getReviews: (reviews) => ({
    type: ActionType.GET_REVIEWS,
    payload: reviews,
  }),
  getNearbyOffers: (nearbyOffers) => ({
    type: ActionType.GET_NEARBY_OFFERS,
    payload: nearbyOffers,
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

    case ActionType.GET_REVIEWS:
      return Object.assign({}, state, {
        reviews: action.payload,
      });

    case ActionType.GET_NEARBY_OFFERS:
      return Object.assign({}, state, {
        nearbyOffers: action.payload,
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

  getReviews: (id) => (dispatch, getState, api) => {
    return api.get(`/comments/${id}`).then((response) => {
      dispatch(
          ActionCreator.getReviews(
              response.data.map((review) => reviewsAdapter(review))
          )
      );
    });
  },

  getNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`).then((response) => {
      dispatch(
          ActionCreator.getNearbyOffers(
              response.data
            .map((offer) => offersAdapter(offer))
            .slice(0, OffersRestriction.MAX_NEARBY_OFFERS_QUANTITY)
          )
      );
    });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
