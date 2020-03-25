import React from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducer/data/data';
import {AppRoute, SortType} from '../../consts';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import SignIn from '../sign-in/sign-in.jsx';
import PrivateRoute from '../private-route/private-route.jsx';
import Favorites from '../favorites/favorites.jsx';
import {
  getAllOffers,
  getCities,
  getCurrentOffers,
  getIsError,
} from '../../reducer/data/selectors';
import {
  getActiveCardCoordinates,
  getCurrentCity,
  getCurrentSortType,
} from '../../reducer/app/selectors';
import {Operation as UserOperation} from '../../reducer/user/user';
import {
  getAuthorizationStatus,
  getLoginStatus,
  getUserEmail,
} from '../../reducer/user/selectors';

const App = (props) => {
  const {
    cities,
    currentOffers,
    currentCity,
    onCityClick,
    currentSortType,
    onSortTypeClick,
    onRentalCardHover,
    activeCardCoordinates,
    isError,
    login,
    userEmail,
    isLoginError,
    authorizationStatus,
    onBookmarkClick,
  } = props;

  return (
    <BrowserRouter>
      <Switch>
        <Route exact path={AppRoute.ROOT}>
          <Main
            cities={cities}
            currentCity={currentCity}
            currentOffers={currentOffers}
            onCityClick={onCityClick}
            currentSortType={currentSortType}
            onSortTypeClick={onSortTypeClick}
            onRentalCardHover={onRentalCardHover}
            activeCardCoordinates={activeCardCoordinates}
            isError={isError}
            userEmail={userEmail}
            onBookmarkClick={onBookmarkClick}
          />
        </Route>
        <Route
          exact
          path={`${AppRoute.PROPERTY}/:id`}
          render={({match}) => {
            if (currentOffers.length === 0) {
              return null;
            }

            const offer = currentOffers[0].offers.find(
                (property) => property.id === +match.params.id
            );

            return (
              <Property
                offer={offer}
                location={currentOffers[0].location}
                offers={currentOffers[0].offers}
                onRentalCardHover={onRentalCardHover}
                activeCardCoordinates={activeCardCoordinates}
                userEmail={userEmail}
              />
            );
          }}
        />
        <Route
          exact
          path={AppRoute.LOGIN}
          render={() => (
            <SignIn
              onSubmit={login}
              isLoginError={isLoginError}
              userEmail={userEmail}
            />
          )}
        />
        <PrivateRoute
          authorizationStatus={authorizationStatus}
          render={() => <Favorites userEmail={userEmail} />}
          path={AppRoute.FAVORITES}
        />
      </Switch>
    </BrowserRouter>
  );
};

App.propTypes = {
  allOffers: PropTypes.array.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentOffers: PropTypes.array.isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
  isError: PropTypes.bool.isRequired,
  login: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
  isLoginError: PropTypes.bool.isRequired,
  authorizationStatus: PropTypes.string.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  allOffers: getAllOffers(state),
  cities: getCities(state),
  currentCity: getCurrentCity(state),
  currentOffers: getCurrentOffers(state),
  currentSortType: getCurrentSortType(state),
  activeCardCoordinates: getActiveCardCoordinates(state),
  isError: getIsError(state),
  userEmail: getUserEmail(state),
  isLoginError: getLoginStatus(state),
  authorizationStatus: getAuthorizationStatus(state),
});

const mapDispatchToProps = (dispatch) => ({
  onCityClick(city) {
    dispatch(ActionCreator.changeCity(city));
    dispatch(DataActionCreator.getOffers(city));
    dispatch(ActionCreator.changeSortType(SortType.POPULAR));
  },
  onSortTypeClick(sortType) {
    dispatch(ActionCreator.changeSortType(sortType));
  },
  onRentalCardHover(coordinates) {
    dispatch(ActionCreator.setActiveCard(coordinates));
  },
  login(userData) {
    dispatch(UserOperation.login(userData));
  },
  onBookmarkClick(id, status) {
    dispatch(DataOperation.changeFavoriteStatus(id, status));
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
