import MockAdapter from 'axios-mock-adapter';
import {createAPI} from '../../api';
import {reducer, ActionType, Operation} from './user';
import {AuthorizationStatus} from '../../consts';
import {USER_EMAIL} from '../../tests-mocks.tsx';

const api = createAPI();

it(`UserReduces without additional information should return initialState`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.UNKNOWN,
    isLoginError: false,
    userEmail: ``,
  });
});

it(`UserReducer should update authorizationStatus by loaded value`, () => {
  expect(
      reducer(
          {
            authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
            isLoginError: false,
            userEmail: ``,
          },
          {
            type: ActionType.AUTHORIZE_USER,
            payload: AuthorizationStatus.AUTHORIZED,
          }
      )
  ).toEqual({
    authorizationStatus: AuthorizationStatus.AUTHORIZED,
    isLoginError: false,
    userEmail: ``,
  });
});

it(`UserReducer should update isLoginError by login error`, () => {
  expect(
      reducer(
          {
            authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
            isLoginError: false,
            userEmail: ``,
          },
          {
            type: ActionType.SET_LOGIN_ERROR,
            payload: true,
          }
      )
  ).toEqual({
    authorizationStatus: AuthorizationStatus.UNAUTHORIZED,
    isLoginError: true,
    userEmail: ``,
  });
});

it(`UserReducer should update userEmail by login data`, () => {
  expect(
      reducer(
          {
            authorizationStatus: AuthorizationStatus.AUTHORIZED,
            isLoginError: false,
            userEmail: ``,
          },
          {
            type: ActionType.FILL_IN_USER_EMAIL,
            payload: USER_EMAIL,
          }
      )
  ).toEqual({
    authorizationStatus: AuthorizationStatus.AUTHORIZED,
    isLoginError: false,
    userEmail: USER_EMAIL,
  });
});

describe(`Operation should work correctly`, () => {
  it(`Should make a correct API call to /login for send data`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const checkAuthorization = Operation.checkAuthorization();

    apiMock.onGet(`/login`).reply(200, []);

    return checkAuthorization(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(2);

      expect(dispatch).toHaveBeenNthCalledWith(1, {
        type: ActionType.AUTHORIZE_USER,
        payload: AuthorizationStatus.AUTHORIZED,
      });

      expect(dispatch).toHaveBeenNthCalledWith(2, {
        type: ActionType.FILL_IN_USER_EMAIL,
        payload: undefined,
      });
    });
  });

  it(`Should make a correct API call to /login for post data`, () => {
    const apiMock = new MockAdapter(api);
    const dispatch = jest.fn();
    const login = Operation.login({
      email: USER_EMAIL,
      password: ``,
    });

    apiMock.onPost(`/login`).reply(200, []);

    return login(dispatch, () => {}, api).then(() => {
      expect(dispatch).toHaveBeenCalledTimes(3);

      expect(dispatch).toHaveBeenNthCalledWith(3, {
        type: ActionType.FILL_IN_USER_EMAIL,
        payload: USER_EMAIL,
      });
    });
  });
});
