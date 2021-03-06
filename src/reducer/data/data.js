import {
  getOffersByCity, getSortedReviews,
  getUniqueCities,
  getUpdatedCurrentOffers,
  getUpdatedFavorites,
  getUpdatedOffers,
} from '../../utils';
import {
  City,
  OffersRestriction,
  ServerResponseStatusCode,
} from '../../consts';
import {mapServerOfferToClient, mapServerCityOfferToClient, reviewsAdapter} from '../../adapter';

const initialState = {
  allOffers: [],
  currentOffers: [],
  cities: [],
  reviews: [],
  nearbyOffers: [],
  isError: false,
  isSending: false,
  favorites: [],
};

const ActionType = {
  LOAD_OFFERS: `LOAD_OFFERS`,
  GET_OFFERS: `GET_OFFERS`,
  SET_ERROR: `SET_ERROR`,
  GET_REVIEWS: `GET_REVIEWS`,
  GET_NEARBY_OFFERS: `GET_NEARBY_OFFERS`,
  POST_REVIEW: `POST_REVIEW`,
  SET_SENDING: `SET_SENDING`,
  LOAD_FAVORITES: `LOAD_FAVORITES`,
  UPDATE_OFFER: `UPDATE_OFFER`,
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
  postReview: (newReview) => ({
    type: ActionType.POST_REVIEW,
    payload: newReview,
  }),
  setSending: (isSending) => ({
    type: ActionType.SET_SENDING,
    payload: isSending,
  }),
  loadFavorites: (favorites) => ({
    type: ActionType.LOAD_FAVORITES,
    payload: favorites,
  }),
  updateOffer: (offer) => ({
    type: ActionType.UPDATE_OFFER,
    payload: offer,
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
        reviews: getSortedReviews(action.payload),
      });

    case ActionType.GET_NEARBY_OFFERS:
      return Object.assign({}, state, {
        nearbyOffers: action.payload,
      });

    case ActionType.POST_REVIEW:
      return Object.assign({}, state, {
        reviews: action.payload,
      });

    case ActionType.SET_SENDING:
      return Object.assign({}, state, {
        isSending: action.payload,
      });

    case ActionType.LOAD_FAVORITES:
      return Object.assign({}, state, {favorites: action.payload});

    case ActionType.UPDATE_OFFER:
      return Object.assign({}, state, {
        allOffers: getUpdatedOffers(action.payload, state.allOffers),
        currentOffers: getUpdatedCurrentOffers(
            action.payload,
            state.currentOffers
        ),
        favorites: getUpdatedFavorites(action.payload, state.favorites),
        nearbyOffers: getUpdatedOffers(action.payload, state.nearbyOffers),
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
                response.data.map((offer) => mapServerCityOfferToClient(offer))
            )
        );
      })
      .catch(() => {
        dispatch(ActionCreator.setError(true));
      });
  },

  getReviews: (id) => (dispatch, getState, api) => {
    return api
      .get(`/comments/${id}`)
      .then((response) => {
        dispatch(
            ActionCreator.getReviews(
                response.data.map((review) => reviewsAdapter(review))
            )
        );
        dispatch(ActionCreator.setError(false));
      })
      .catch(() => {
        dispatch(ActionCreator.setError(true));
      });
  },

  getNearbyOffers: (id) => (dispatch, getState, api) => {
    return api.get(`/hotels/${id}/nearby`).then((response) => {
      dispatch(
          ActionCreator.getNearbyOffers(
              response.data
            .map((offer) => mapServerCityOfferToClient(offer))
            .slice(0, OffersRestriction.MAX_NEARBY_OFFERS_QUANTITY)
          )
      );
      dispatch(ActionCreator.setError(false));
    });
  },

  postReview: (id, newReview) => (dispatch, getState, api) => {
    dispatch(ActionCreator.setSending(true));
    return api
      .post(`/comments/${id}`, newReview)
      .then((response) => {
        dispatch(
            ActionCreator.getReviews(
                response.data.map((review) => reviewsAdapter(review))
            )
        );
      })
      .then(() => dispatch(ActionCreator.setSending(false)))
      .catch(() => {
        dispatch(ActionCreator.setError(true));
      });
  },

  loadFavorites: () => (dispatch, getState, api) => {
    return api.get(`/favorite`).then((response) => {
      dispatch(
          ActionCreator.loadFavorites(
              response.data.map((favorite) => mapServerOfferToClient(favorite))
          )
      );
    });
  },

  changeFavoriteStatus: (id, status) => (dispatch, getState, api) => {
    return api
      .post(`/favorite/${id}/${Number(status)}`)
      .then((response) => {
        dispatch(ActionCreator.updateOffer(mapServerOfferToClient(response.data)));
      })
      .catch((error) => {
        if (
          error.response &&
          error.response.status === ServerResponseStatusCode.UNAUTHORIZED
        ) {
          dispatch(ActionCreator.setError(true));
        }
      });
  },
};

export {reducer, ActionType, ActionCreator, Operation};
