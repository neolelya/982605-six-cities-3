import React from 'react';
import PropTypes from 'prop-types';
import {OffersRestriction, OFFER_TYPES} from '../../consts';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import Map from '../map/map.jsx';
import {getDistance} from '../../utils';
import Header from '../header/header.jsx';
import OffersList from '../offers-list/offers-list.jsx';

const Property = (props) => {
  const {
    offers,
    location,
    offer: {
      id,
      rentalHost: {hostName, hostAvatar, isSuper},
      coordinates,
      rentalTitle,
      rentalImages,
      rentalPrice,
      rentalRating,
      rentalType,
      isPremium,
      isBookmark,
      rentalDescription,
      rentalRoomsQuantity,
      rentalMaxGuestsQuantity,
      rentalFeatures,
      reviews,
    },
    onHeaderClick,
    onRentalCardHover,
    activeCardCoordinates,
  } = props;

  const ratingPercent =
    (Math.round(rentalRating) * 100) / OffersRestriction.MAX_RATING;
  const nearestOffersCoordinates = offers
    .map((offer) => offer.coordinates)
    .sort((a, b) => getDistance(a, coordinates) - getDistance(b, coordinates))
    .slice(0, OffersRestriction.MAX_MAP_OFFERS_QUANTITY);

  const nearestOffers = offers
    .filter((offer) => offer.id !== id)
    .slice(0, OffersRestriction.MAX_SIMILAR_OFFERS_QUANTITY);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {rentalImages
                .map((image, i) => {
                  return (
                    <div key={i + image} className="property__image-wrapper">
                      <img
                        className="property__image"
                        src={image}
                        alt="Photo studio"
                      />
                    </div>
                  );
                })
                .slice(0, OffersRestriction.MAX_IMAGES_QUANTITY)}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">{rentalTitle}</h1>
                <button
                  className={`property__bookmark-button button ${
                    isBookmark ? `property__bookmark-button--active` : ``
                  }`}
                  type="button"
                >
                  <svg
                    className="property__bookmark-icon"
                    width="31"
                    height="33"
                  >
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${ratingPercent}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">
                  {rentalRating}
                </span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {rentalType}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {rentalRoomsQuantity} Bedrooms
                </li>
                <li className="property__feature property__feature--adults">
                  Max {rentalMaxGuestsQuantity} adults
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{rentalPrice}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {rentalFeatures.map((feature, i) => {
                    return (
                      <li key={i + feature} className="property__inside-item">
                        {feature}
                      </li>
                    );
                  })}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div
                    className={`property__avatar-wrapper user__avatar-wrapper
                    ${isSuper ? `property__avatar-wrapper--pro` : ``}`}
                  >
                    <img
                      className="property__avatar user__avatar"
                      src={hostAvatar}
                      width="74"
                      height="74"
                      alt="Host avatar"
                    />
                  </div>
                  <span className="property__user-name">{hostName}</span>
                </div>
                <div className="property__description">
                  {rentalDescription.map((description, i) => {
                    return (
                      <p key={i + description} className="property__text">
                        {description}
                      </p>
                    );
                  })}
                </div>
              </div>
              {<ReviewsList reviews={reviews} />}
            </div>
          </div>
          <section
            className="property__map map"
            style={{width: `80%`, margin: `0 auto 50px auto`}}
          >
            <Map
              location={location}
              offersCoordinates={nearestOffersCoordinates}
              activeCoordinates={coordinates}
              activeCardCoordinates={activeCardCoordinates}
            />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">
              Other places in the neighbourhood
            </h2>
            <div className="near-places__list places__list">
              <OffersList
                rentalCardsList={nearestOffers}
                onHeaderClick={onHeaderClick}
                onRentalCardHover={onRentalCardHover}
              />
            </div>
          </section>
        </div>
      </main>
    </div>
  );
};

Property.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rentalHost: PropTypes.shape({
      hostAvatar: PropTypes.string.isRequired,
      hostName: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
    rentalTitle: PropTypes.string.isRequired,
    rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rentalPrice: PropTypes.number.isRequired,
    rentalRating: PropTypes.number.isRequired,
    rentalType: PropTypes.oneOf(OFFER_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    isBookmark: PropTypes.bool.isRequired,
    rentalDescription: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
    rentalRoomsQuantity: PropTypes.number.isRequired,
    rentalMaxGuestsQuantity: PropTypes.number.isRequired,
    rentalFeatures: PropTypes.array.isRequired,
    reviews: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string.isRequired,
          avatar: PropTypes.string.isRequired,
          rating: PropTypes.number.isRequired,
          date: PropTypes.object.isRequired,
          text: PropTypes.string.isRequired,
        }).isRequired
    ).isRequired,
  }).isRequired,
  location: PropTypes.shape({
    cityCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
  }).isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.arrayOf(PropTypes.number.isRequired).isRequired,
      }).isRequired
  ).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
};

export default Property;
