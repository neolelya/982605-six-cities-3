import * as React from 'react';
import {BrowserRouter, Redirect, Route, Switch} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app';
import {
  ActionCreator as DataActionCreator,
  Operation as DataOperation,
} from '../../reducer/data/data';
import {AppRoute, SortType} from '../../consts';
import Main from '../main/main';
import Property from '../property/property';
import SignIn from '../sign-in/sign-in';
import PrivateRoute from '../private-route/private-route';
import Favorites from '../favorites/favorites';
import {
  getAllOffers,
  getCities,
  getCurrentOffers,
  getFavorites,
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
import {Coordinate, OffersShape} from '../../shape';

interface Props {
  allOffers: OffersShape;
  cities: string[];
  currentOffers: OffersShape;
  currentCity: string;
  onCityClick: (city: string) => void;
  currentSortType: string;
  onSortTypeClick: (sortType: string) => void;
  onRentalCardHover: (coordinate: Coordinate) => void;
  activeCardCoordinates: number[];
  isError: boolean;
  onLogin: ({email, password}: { email: string; password: string }) => void;
  userEmail?: string;
  isLoginError: boolean;
  authorizationStatus: string;
  onBookmarkClick: (id: number, status: boolean) => void;
  onUserEmailClick: () => void;
}

const App: React.FC<Props> = (props: Props) => {
  const {
    allOffers,
    cities,
    currentOffers,
    currentCity,
    onCityClick,
    currentSortType,
    onSortTypeClick,
    onRentalCardHover,
    activeCardCoordinates,
    isError,
    onLogin,
    userEmail,
    isLoginError,
    authorizationStatus,
    onBookmarkClick,
    onUserEmailClick,
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
            onUserEmailClick={onUserEmailClick}
          />
        </Route>
        <Route
          exact
          path={`${AppRoute.OFFER}/:id`}
          render={({match}) => {
            if (currentOffers.length === 0) {
              return null;
            }

            const offer = allOffers.find(
                (property) => property.offers[0].id === +match.params.id
            );

            if (!offer) {
              return <Redirect to={AppRoute.ROOT} />;
            }

            return (
              <Property
                offer={offer.offers[0]}
                location={offer.location}
                offers={currentOffers[0].offers}
                onRentalCardHover={onRentalCardHover}
                activeCardCoordinates={activeCardCoordinates}
                userEmail={userEmail}
              />
            );
          }}
        />
        <Route exact path={AppRoute.LOGIN}>
          <SignIn
            onSubmit={onLogin}
            isLoginError={isLoginError}
            userEmail={userEmail}
            onUserEmailClick={onUserEmailClick}
          />
        </Route>
        <PrivateRoute
          authorizationStatus={authorizationStatus}
          render={() => (
            <Favorites
              onRentalCardHover={onRentalCardHover}
              userEmail={userEmail}
            />
          )}
          path={AppRoute.FAVORITES}
        />
        <Redirect to={AppRoute.ROOT} />
      </Switch>
    </BrowserRouter>
  );
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
  favorites: getFavorites(state),
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
  onLogin(userData) {
    dispatch(UserOperation.login(userData));
  },
  onBookmarkClick(id, status) {
    dispatch(DataOperation.changeFavoriteStatus(id, status));
  },
  onUserEmailClick() {
    dispatch(DataOperation.loadFavorites());
  },
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
