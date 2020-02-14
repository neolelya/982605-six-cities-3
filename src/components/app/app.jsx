import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';
import {OFFER_TYPES} from '../../consts';

class App extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      value: -1,
    };

    this._handleHeaderClick = this._handleHeaderClick.bind(this);
  }

  _handleHeaderClick(id) {
    this.setState({
      value: id,
    });
  }

  _renderMainScreen() {
    return (
      <Main
        rentalOfferCount={this.props.rentalOfferCount}
        rentalOffers={this.props.rentalOffers}
        onHeaderClick={this._handleHeaderClick}
      />
    );
  }

  _renderPropertyScreen(id) {
    const offer = this.props.rentalOffers.find(
        (property) => property.id === +id
    );
    return offer ? <Property offer={offer} /> : <Redirect to="/" />;
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  rentalOfferCount: PropTypes.number.isRequired,
  rentalOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rentalHost: PropTypes.shape({
          hostAvatar: PropTypes.string.isRequired,
          hostName: PropTypes.string.isRequired,
          isSuper: PropTypes.bool.isRequired,
        }).isRequired,
        rentalTitle: PropTypes.string.isRequired,
        rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        rentalPrice: PropTypes.number.isRequired,
        rentalRating: PropTypes.number.isRequired,
        rentalType: PropTypes.oneOf(OFFER_TYPES).isRequired,
        isPremium: PropTypes.bool.isRequired,
        isBookmark: PropTypes.bool.isRequired,
        rentalDescription: PropTypes.string.isRequired,
        rentalRoomsQuantity: PropTypes.number.isRequired,
        rentalMaxGuestsQuantity: PropTypes.number.isRequired,
        rentalFeatures: PropTypes.array.isRequired,
      })
  ).isRequired,
};

export default App;
