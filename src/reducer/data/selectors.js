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
