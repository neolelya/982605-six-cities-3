import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import OffersList from '../offers-list/offers-list.jsx';
import {AppRoute, ClassName} from '../../consts';

const FavoritesItem = ({
  favoriteCity,
  favoriteOffers,
  onBookmarkClick,
  onRentalCardHover,
}) => {

  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} className="locations__item-link" >
            <span>{favoriteCity}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList
          rentalCardsList={favoriteOffers}
          onRentalCardHover={onRentalCardHover}
          onBookmarkClick={onBookmarkClick}
          pageClass={ClassName.FAVORITES}
        />
      </div>
    </li>
  );
};

FavoritesItem.propTypes = {
  favoriteCity: PropTypes.string.isRequired,
  favoriteOffers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        coordinates: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
          city: PropTypes.string.isRequired,
        }).isRequired,
        rentalHost: PropTypes.shape({
          id: PropTypes.number.isRequired,
          hostName: PropTypes.string.isRequired,
          hostAvatar: PropTypes.string.isRequired,
          isSuper: PropTypes.bool.isRequired,
        }).isRequired,
        rentalTitle: PropTypes.string.isRequired,
        rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
        rentalPrice: PropTypes.number.isRequired,
        rentalRating: PropTypes.number.isRequired,
        rentalType: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
        isBookmark: PropTypes.bool.isRequired,
        rentalDescription: PropTypes.arrayOf(PropTypes.string.isRequired)
        .isRequired,
        rentalRoomsQuantity: PropTypes.number.isRequired,
        rentalMaxGuestsQuantity: PropTypes.number.isRequired,
        rentalFeatures: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
      }).isRequired
  ).isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
};

export default FavoritesItem;
