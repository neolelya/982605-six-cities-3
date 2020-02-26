import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom';
import Main from '../main/main.jsx';
import Property from '../property/property.jsx';

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
        rentalOffers={this.props.rentalOffers}
        onHeaderClick={this._handleHeaderClick}
      />
    );
  }

  _renderPropertyScreen(id) {
    const offer = this.props.rentalOffers[0].offers.find(
        (property) => property.id === +id
    );
    return offer ? (
      <Property
        offer={offer}
        location={this.props.rentalOffers[0].location}
        offers={this.props.rentalOffers[0].offers}
        onHeaderClick={this._handleHeaderClick}
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
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  rentalOffers: PropTypes.array.isRequired,
};

export default App;
