import {SortType} from '../../consts';
import {City} from '../../consts';

const initialState = {
  currentCity: City.AMSTERDAM,
  currentSortType: SortType.POPULAR,
  activeCardCoordinates: [],
};

const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`,
  CHANGE_SORT_TYPE: `CHANGE_SORT_TYPE`,
  SET_ACTIVE_CARD: `SET_ACTIVE_CARD`,
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
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
