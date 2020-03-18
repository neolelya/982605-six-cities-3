import {AuthorizationStatus, ServerResponseStatusCode} from '../../consts';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
  isLoginError: false,
  userEmail: ``,
};

const ActionType = {
  AUTHORIZE_USER: `AUTHORIZE_USER`,
  SET_LOGIN_ERROR: `SET_LOGIN_ERROR`,
  FILL_IN_USER_EMAIL: `FILL_IN_USER_EMAIL`,
};

const ActionCreator = {
  authorizeUser: (status) => ({
    type: ActionType.AUTHORIZE_USER,
    payload: status,
  }),
  setLoginError: (isError) => ({
    type: ActionType.SET_LOGIN_ERROR,
    payload: isError,
  }),
  fillInUserEmail: (email) => ({
    type: ActionType.FILL_IN_USER_EMAIL,
    payload: email,
  }),
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.AUTHORIZE_USER:
      return Object.assign({}, state, {
        authorizationStatus: action.payload,
      });

    case ActionType.SET_LOGIN_ERROR:
      return Object.assign({}, state, {
        isLoginError: action.payload,
      });

    case ActionType.FILL_IN_USER_EMAIL:
      return Object.assign({}, state, {
        userEmail: action.payload,
      });
  }
  return state;
};

const Operation = {
  checkAuthorization: () => (dispatch, getState, api) => {
    return api
      .get(`/login`)
      .then(() => {
        dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
      })
      .catch((error) => {
        if (error.response.status === ServerResponseStatusCode.UNAUTHORIZED) {
          dispatch(
              ActionCreator.authorizeUser(AuthorizationStatus.UNAUTHORIZED)
          );
          throw new Error(error.response.data.error);
        }
      });
  },

  login: (userData) => (dispatch, getStore, api) => {
    return api
      .post(`/login`, {
        email: userData.email,
        password: userData.password,
      })
      .then(() => {
        dispatch(ActionCreator.authorizeUser(AuthorizationStatus.AUTHORIZED));
        dispatch(ActionCreator.setLoginError(false));
        dispatch(ActionCreator.fillInUserEmail(userData.email));
      })
      .catch((error) => {
        if (error.response.status === ServerResponseStatusCode.BAD_REQUEST) {
          dispatch(
              ActionCreator.authorizeUser(AuthorizationStatus.UNAUTHORIZED)
          );
          dispatch(ActionCreator.setLoginError(true));
          throw new Error(`Please, check your login data`);
        }
      });
  },
};

export {Operation, reducer, ActionCreator, ActionType};
