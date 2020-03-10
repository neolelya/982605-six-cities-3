import {NameSpace} from '../name-space';

export const getCurrentCity = (state) => {
  return state[NameSpace.APP].currentCity;
};

export const getCurrentSortType = (state) => {
  return state[NameSpace.APP].currentSortType;
};

export const getActiveCardCoordinates = (state) => {
  return state[NameSpace.APP].activeCardCoordinates;
};
