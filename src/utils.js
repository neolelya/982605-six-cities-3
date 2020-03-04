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

export const getDistance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

export const getOffersByCity = (city, offers) => {
  return offers.filter((offer) => offer.location.city === city);
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
