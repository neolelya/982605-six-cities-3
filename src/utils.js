import {OffersRestriction, SortType} from './consts';

export const formatDate = (date) => {
  const options = {
    day: `numeric`,
    month: `long`,
    year: `numeric`,
  };

  return new Intl.DateTimeFormat(`en`, options).format(date);
};

export const formatDateTime = (date) => {
  let month = `` + (date.getMonth() + 1);
  let day = `` + date.getDate();
  const year = date.getFullYear();

  if (month.length < 2) {
    month = `0` + month;
  }
  if (day.length < 2) {
    day = `0` + day;
  }

  return [year, month, day].join(`-`);
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getOffersByCity = (city, offers) => {
  const citiesOffers = offers.filter((offer) => offer.location.city === city);
  let groupedOffers = [];
  citiesOffers.forEach((offer) => groupedOffers.push(offer.offers[0]));
  return [
    Object.assign(
        {},
        {location: citiesOffers[0].location},
        {offers: groupedOffers}
    ),
  ];
};

export const getUniqueCities = (offers) => {
  const cities = new Set();
  offers.forEach((offer) => cities.add(offer.location.city));
  return [...cities].slice(0, OffersRestriction.MAX_CITIES_COUNT);
};

export const getSortedOffers = (offers, sortType) => {
  switch (sortType) {
    case SortType.PRICE_LOW_TO_HIGH:
      return offers.slice().sort((a, b) => a.rentalPrice - b.rentalPrice);
    case SortType.PRICE_HIGH_TO_LOW:
      return offers.slice().sort((a, b) => b.rentalPrice - a.rentalPrice);
    case SortType.TOP_RATED:
      return offers.slice().sort((a, b) => b.rentalRating - a.rentalRating);
    default:
    case SortType.POPULAR:
      return offers;
  }
};

export const getUpdatedOffers = (updatedOffer, offers) => {
  return offers.map((offer) =>
    offer.offers[0].id === updatedOffer.id
      ? Object.assign({}, offer, {
        offers: [updatedOffer],
      })
      : offer
  );
};

export const getUpdatedCurrentOffers = (updatedOffer, offers) => {
  return offers[0].offers.map((offer) =>
    offer.id === updatedOffer.id ? updatedOffer : offer
  );
};

export const getUpdatedFavorites = (updatedOffer, offers) =>
  updatedOffer.isBookmark
    ? [...offers, updatedOffer]
    : offers.filter((offer) => offer.id !== updatedOffer.id);
