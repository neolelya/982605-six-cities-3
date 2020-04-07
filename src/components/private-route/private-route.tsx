import * as React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../consts';
import Loading from '../loading/loading';

interface Props {
  authorizationStatus: string;
  path: string;
  render: () => React.ReactNode;
}

const PrivateRoute: React.FC<Props> = (props: Props) => {
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

export default PrivateRoute;
