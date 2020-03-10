export const OffersRestriction = {
  MAX_RATING: 5,
  MAX_CITIES_COUNT: 6,
  MAX_IMAGES_QUANTITY: 6,
  MAX_REVIEWS_QUANTITY: 10,
  MAX_SIMILAR_OFFERS_QUANTITY: 3,
  MAX_MAP_OFFERS_QUANTITY: 4,
};

export const City = {
  PARIS: `Paris`,
  COLOGNE: `Cologne`,
  BRUSSELS: `Brussels`,
  AMSTERDAM: `Amsterdam`,
  HAMBURG: `Hamburg`,
  DUSSELDORF: `Dusseldorf`,
};

export const RentalType = {
  APARTMENT: `Apartment`,
  ROOM: `Room`,
  HOUSE: `House`,
  HOTEL: `Hotel`,
};

export const OFFER_TYPES = [
  RentalType.APARTMENT,
  RentalType.ROOM,
  RentalType.HOUSE,
  RentalType.HOTEL,
];

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};
