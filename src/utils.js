import {OffersRestriction} from './consts';

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

// function generateRandomPoint(center) {
//   const [x0, y0] = center;
//   // Convert Radius from meters to degrees.
//   const rd = 1000 / 111300;
//
//   const w = rd * Math.sqrt(Math.random());
//   const t = 2 * Math.PI * Math.random();
//   const x = w * Math.cos(t);
//   const y = w * Math.sin(t);
//
//   const xp = x / Math.cos(y0);
//
//   // Resulting point.
//   return [xp + x0, y + y0];
// }
//
// export const getAllOffers = (offer, cities) =>
//   cities.map((city) =>
//     Object.assign({}, offer, {
//       location: Object.assign(
//           {},
//           offer.location,
//           {city},
//           {cityCoordinates: CityCoordinates[city]}
//       ),
//       offers: offer.offers.map((property) =>
//         Object.assign({}, property, {
//           coordinates: generateRandomPoint(CityCoordinates[city]),
//         })
//       ),
//     })
//   );

export const getUniqueCities = (offers) => {
  const cities = new Set();
  offers.forEach((offer) => cities.add(offer.location.city));
  return [...cities].slice(0, OffersRestriction.MAX_CITIES_COUNT);
};
