import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import Loading from '../loading/loading.jsx';

const PrivateRoute = (props) => {
  const {authorizationStatus, path, render} = props;
  return (
    <Route
      exact
      path={path}
      render={() => {
        switch (authorizationStatus) {
          case AuthorizationStatus.AUTHORIZED:
            return render();
          case AuthorizationStatus.UNAUTHORIZED:
            return <Redirect to={AppRoute.LOGIN} />;
          case AuthorizationStatus.UNKNOWN:
            return <Loading />;
        }
        return null;
      }}
    />
  );
};

PrivateRoute.propTypes = {
  authorizationStatus: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  render: PropTypes.func.isRequired,
};

export default PrivateRoute;
