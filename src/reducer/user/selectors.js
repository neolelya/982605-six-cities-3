import {NameSpace} from '../name-space';

export const getUserEmail = (state) => {
  return state[NameSpace.USER].userEmail;
};

export const getLoginStatus = (state) => {
  return state[NameSpace.USER].isLoginError;
};

export const getAuthorizationStatus = (state) => {
  return state[NameSpace.USER].authorizationStatus;
};
