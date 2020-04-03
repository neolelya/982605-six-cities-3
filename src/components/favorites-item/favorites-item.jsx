import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import OffersList from '../offers-list/offers-list.jsx';
import {AppRoute, ClassName} from '../../consts';
import {offerShape} from '../../shape';

const FavoritesItem = ({
  favoriteCity,
  favoriteOffers,
  onBookmarkClick,
  onRentalCardHover,
  userEmail,
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
          userEmail={userEmail}
        />
      </div>
    </li>
  );
};

FavoritesItem.propTypes = {
  favoriteCity: PropTypes.string.isRequired,
  favoriteOffers: PropTypes.arrayOf(offerShape).isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  userEmail: PropTypes.string,
};

export default FavoritesItem;
