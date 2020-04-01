import PropTypes from 'prop-types';
import {OFFER_TYPES} from './consts';

export const reviewShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  user: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    isPro: PropTypes.bool.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  rating: PropTypes.number.isRequired,
  date: PropTypes.object.isRequired,
  comment: PropTypes.string.isRequired,
}).isRequired;

export const reviewsShape = PropTypes.arrayOf(reviewShape).isRequired;

export const hostShape = PropTypes.shape({
  hostAvatar: PropTypes.string.isRequired,
  hostName: PropTypes.string.isRequired,
  isSuper: PropTypes.bool.isRequired,
}).isRequired;

export const coordinatesShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
}).isRequired;

export const coordinatesWithCityShape = PropTypes.shape({
  latitude: PropTypes.number.isRequired,
  longitude: PropTypes.number.isRequired,
  zoom: PropTypes.number.isRequired,
  city: PropTypes.string.isRequired,
}).isRequired;

export const offerShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  rentalHost: hostShape,
  coordinates: coordinatesWithCityShape,
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
}).isRequired;

export const locationShape = PropTypes.shape({
  city: PropTypes.string.isRequired,
  cityCoordinates: coordinatesShape
}).isRequired;

export const offersShape = PropTypes.arrayOf(
    PropTypes.shape({
      location: locationShape,
      offers: PropTypes.arrayOf(offerShape).isRequired,
    }).isRequired
).isRequired;

export const favoritesShape = PropTypes.arrayOf(
    PropTypes.shape({
      city: PropTypes.string.isRequired,
      offers: PropTypes.arrayOf(offerShape).isRequired,
    }).isRequired
).isRequired;
