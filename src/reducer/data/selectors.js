import {NameSpace} from '../name-space';

export const getAllOffers = (state) => {
  return state[NameSpace.DATA].allOffers;
};

export const getCurrentOffers = (state) => {
  return state[NameSpace.DATA].currentOffers;
};

export const getCities = (state) => {
  return state[NameSpace.DATA].cities;
};

export const getIsError = (state) => {
  return state[NameSpace.DATA].isError;
};

export const getReviews = (state) => {
  return state[NameSpace.DATA].reviews;
};

export const getNearbyOffers = (state) => {
  return state[NameSpace.DATA].nearbyOffers;
};

export const getIsSending = (state) => {
  return state[NameSpace.DATA].isSending;
};

export const getFavorites = (state) => {
  const offers = state[NameSpace.DATA].favorites;

  const citiesMap = {};

  offers.forEach((offer) => {
    if (!citiesMap[offer.coordinates.city]) {
      citiesMap[offer.coordinates.city] = [];
    }
    citiesMap[offer.coordinates.city].push(offer);
    return citiesMap;
  });

  return Object.keys(citiesMap).map((city) => ({city, offers: citiesMap[city]}));
};

