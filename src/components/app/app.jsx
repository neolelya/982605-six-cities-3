import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {rentalOffers, rentalTitles} = props;

  return <Main rentalOffers={rentalOffers} rentalTitles={rentalTitles} />;
};

App.propTypes = {
  rentalOffers: PropTypes.number.isRequired,
  rentalTitles: PropTypes.array.isRequired,
};

export default App;
