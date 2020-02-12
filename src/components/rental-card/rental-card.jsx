import React from 'react';
import PropTypes from 'prop-types';

const RentalCard = (props) => {
  const {
    id,
    rentalTitle,
    rentalImage,
    rentalPrice,
    rentalRating,
    rentalType,
    isPremium,
    isBookmark,
    onHeaderClick,
    onMouseEnter,
    onMouseLeave,
  } = props;

  return (
    <article
      className="cities__place-card place-card"
      onMouseEnter={() => {
        onMouseEnter(id);
      }}
      onMouseLeave={() => {
        onMouseLeave();
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
            src={rentalImage}
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
            <span style={{width: rentalRating}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name" onClick={onHeaderClick}>
          <a href="#">{rentalTitle}</a>
        </h2>
        <p className="place-card__type">{rentalType}</p>
      </div>
    </article>
  );
};

RentalCard.propTypes = {
  id: PropTypes.number.isRequired,
  rentalTitle: PropTypes.string.isRequired,
  rentalImage: PropTypes.string.isRequired,
  rentalPrice: PropTypes.number.isRequired,
  rentalRating: PropTypes.string.isRequired,
  rentalType: PropTypes.string.isRequired,
  isPremium: PropTypes.bool.isRequired,
  isBookmark: PropTypes.bool.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onMouseEnter: PropTypes.func.isRequired,
  onMouseLeave: PropTypes.func.isRequired,
};

export default RentalCard;
