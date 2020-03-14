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

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

export const getDistance = ([x1, y1], [x2, y2]) =>
  Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));

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

export const offersAdapter = (data) => {
  return {
    location: {
      city: data.city.name,
      cityCoordinates: {
        latitude: data.city.location.latitude,
        longitude: data.city.location.longitude,
        zoom: data.city.location.zoom,
      },
    },
    offers: [
      {
        id: data.id,
        coordinates: {
          latitude: data.location.latitude,
          longitude: data.location.longitude,
          zoom: data.location.zoom,
        },
        rentalHost: {
          id: data.host.id,
          hostName: data.host.name,
          hostAvatar: data.host.avatar_url,
          isSuper: data.host.is_pro,
        },
        rentalTitle: data.title,
        rentalImages: [data.preview_image, ...data.images],
        rentalPrice: data.price,
        rentalRating: data.rating,
        rentalType: capitalizeFirstLetter(data.type),
        isPremium: data.is_premium,
        isBookmark: data.is_favorite,
        rentalDescription: [data.description],
        rentalRoomsQuantity: data.bedrooms,
        rentalMaxGuestsQuantity: data.max_adults,
        rentalFeatures: data.goods,
        reviews: [
          {
            id: 0,
            name: `Adam`,
            avatar: `img/avatar-max.jpg`,
            rating: 4,
            date: new Date(2020, 0, 12),
            text: `Easy Check In: Management did extra mile, and allowed me to check in several hours before. Cleaning of my unit was swiftly organized, and properly introduced.`,
          },
          {
            id: 1,
            name: `Mary`,
            avatar: `img/avatar-angelina.jpg`,
            rating: 5,
            date: new Date(2020, 2, 15),
            text: `The building is in between the beach and metro station, 5 mins walking distance to both; 5 stops away from the Gothic Quarter by metro.`,
          },
          {
            id: 2,
            name: `Alex`,
            avatar: `img/avatar.svg`,
            rating: 5,
            date: new Date(2020, 1, 28),
            text: `We need a quick place to stay for the night and rented the same day. Was nice and clean. Had parking available for 15€ for the night. Was a little noisy but it ended by 11pm and we were able to get a decent night sleep. Had everything we needed.`,
          },
        ],
      },
    ],
  };
};

export const reviewsAdapter = (data) => {
  return {
    id: data.id,
    user: {
      id: data.user.id,
      name: data.user.name,
      avatar: data.user.avatar_url,
      isPro: data.user.is_pro,
    },
    rating: data.rating,
    date: new Date(data.date),
    comment: data.comment,
  };
};
