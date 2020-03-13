import React from 'react';
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import {OffersRestriction, OFFER_TYPES} from '../../consts';

const RentalCard = (props) => {
  const {
    id,
    rentalTitle,
    rentalImages,
    rentalPrice,
    rentalRating,
    rentalType,
    isPremium,
    isBookmark,
    coordinates,
    onRentalCardHover,
  } = props;

  const ratingPercent =
    (Math.round(rentalRating) * 100) / OffersRestriction.MAX_RATING;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => {
        onRentalCardHover([coordinates.latitude, coordinates.longitude]);
      }}
      onMouseLeave={() => {
        onRentalCardHover([]);
      }}
    >
      {isPremium && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className="cities__image-wrapper place-card__image-wrapper">
        <a href="#">
          <img
            className="place-card__image"
            src={rentalImages[0]}
            width="260"
            height="200"
            alt="Place image"
          />
        </a>
      </div>
      <div className="place-card__info">
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{rentalPrice}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button
            className={`place-card__bookmark-button button ${
              isBookmark ? `place-card__bookmark-button--active` : ``
            }`}
            type="button"
          >
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={{pathname: `/property/${id}`}}>{rentalTitle}</Link>
        </h2>
        <p className="place-card__type">{rentalType}</p>
      </div>
    </article>
  );
};

RentalCard.propTypes = {
  id: PropTypes.number.isRequired,
  rentalTitle: PropTypes.string.isRequired,
  rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  rentalPrice: PropTypes.number.isRequired,
  rentalRating: PropTypes.number.isRequired,
  rentalType: PropTypes.oneOf(OFFER_TYPES).isRequired,
  isPremium: PropTypes.bool.isRequired,
  isBookmark: PropTypes.bool.isRequired,
  coordinates: PropTypes.shape({
    latitude: PropTypes.number.isRequired,
    longitude: PropTypes.number.isRequired,
    zoom: PropTypes.number.isRequired,
  }).isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
};

export default RentalCard;
