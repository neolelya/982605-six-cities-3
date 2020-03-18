import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {ActionCreator} from '../../reducer/app/app';
import {ActionCreator as DataActionCreator} from '../../reducer/data/data';
import {SortType} from '../../consts';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import SignIn from '../sign-in/sign-in.jsx';
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
import {getLoginStatus, getUserEmail} from '../../reducer/user/selectors';

class App extends PureComponent {
  _renderMainScreen() {
    return (
      <Main
        cities={this.props.cities}
        currentCity={this.props.currentCity}
        currentOffers={this.props.currentOffers}
        onCityClick={this.props.onCityClick}
        currentSortType={this.props.currentSortType}
        onSortTypeClick={this.props.onSortTypeClick}
        onRentalCardHover={this.props.onRentalCardHover}
        activeCardCoordinates={this.props.activeCardCoordinates}
        isError={this.props.isError}
        userEmail={this.props.userEmail}
      />
    );
  }

  _renderPropertyScreen(id) {
    if (this.props.currentOffers.length === 0) {
      return null;
    }

    const offer = this.props.currentOffers[0].offers.find(
        (property) => property.id === +id
    );
    return offer ? (
      <Property
        offer={offer}
        location={this.props.currentOffers[0].location}
        offers={this.props.currentOffers[0].offers}
        onRentalCardHover={this.props.onRentalCardHover}
        activeCardCoordinates={this.props.activeCardCoordinates}
        userEmail={this.props.userEmail}
      />
    ) : (
      <Redirect to="/" />
    );
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path="/">
            {this._renderMainScreen()}
          </Route>
          <Route
            exact
            path="/property/:id"
            render={(routeProps) =>
              this._renderPropertyScreen(routeProps.match.params.id)
            }
          />
          <Route
            exact
            path="/login"
            render={() => (
              <SignIn
                onSubmit={this.props.login}
                isLoginError={this.props.isLoginError}
                userEmail={this.props.userEmail}
              />
            )}
          />
        </Switch>
      </BrowserRouter>
    );
  }
}

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
});

export {App};
export default connect(mapStateToProps, mapDispatchToProps)(App);
