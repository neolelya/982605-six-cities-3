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

export const CITIES = [
  City.PARIS,
  City.COLOGNE,
  City.BRUSSELS,
  City.AMSTERDAM,
  City.HAMBURG,
  City.DUSSELDORF,
];

export const CityCoordinates = {
  Paris: [48.85341, 2.3488],
  Cologne: [50.93333, 6.95],
  Brussels: [50.85045, 4.34878],
  Amsterdam: [52.38333, 4.9],
  Hamburg: [53.57532, 10.01534],
  Dusseldorf: [51.22172, 6.77616],
};

export const RentalType = {
  APARTMENT: `Apartment`,
  ROOM: `room`,
  HOUSE: `House`,
  HOTEL: `Hotel`,
};

export const OFFER_TYPES = [
  RentalType.APARTMENT,
  RentalType.ROOM,
  RentalType.HOUSE,
  RentalType.HOTEL,
];

export const RentalFeature = {
  WIFI: `Wi-Fi`,
  PARKING: `Parking`,
  HEATING: `Heating`,
  KITCHEN: `Kitchen`,
  CABLETV: `Cable TV`,
  DISHWASHER: `Dishwasher`,
  WASHINGMACHINE: `Waching machine`,
  DRYER: `Dryer`,
};

export const OFFER_FEATURES = [
  RentalFeature.WIFI,
  RentalFeature.PARKING,
  RentalFeature.HEATING,
  RentalFeature.KITCHEN,
  RentalFeature.CABLETV,
  RentalFeature.DISHWASHER,
  RentalFeature.WASHINGMACHINE,
  RentalFeature.DRYER,
];

export const SortType = {
  POPULAR: `Popular`,
  PRICE_LOW_TO_HIGH: `Price: low to high`,
  PRICE_HIGH_TO_LOW: `Price: high to low`,
  TOP_RATED: `Top rated first`,
};
