import React from 'react';
import PropTypes from 'prop-types';
import Main from '../main/main.jsx';

const App = (props) => {
  const {rentalOfferCount, rentalOffers, onHeaderClick} = props;

  return (
    <Main
      rentalOfferCount={rentalOfferCount}
      rentalOffers={rentalOffers}
      onHeaderClick={onHeaderClick}
    />
  );
};

App.propTypes = {
  rentalOfferCount: PropTypes.number.isRequired,
  rentalOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rentalTitle: PropTypes.string.isRequired,
        rentalImage: PropTypes.string.isRequired,
        rentalPrice: PropTypes.number.isRequired,
        rentalRating: PropTypes.string,
        rentalType: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
        isBookmark: PropTypes.bool,
      })
  ).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

export default App;
