import {OFFER_TYPES} from './consts';

type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatar: string;
};

export type Coordinate = [number, number];

export type Review = {
  id: number;
  user: User;
  rating: number;
  date: object;
  comment: string;
};

export type Reviews = Array<Review>;

export type Host = {
  id: number;
  hostAvatar: string;
  hostName: string;
  isSuper: boolean;
};

export type Coordinates = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CoordinatesWithCity = Coordinates & {city: string};

export type Offer = {
  id: number;
  rentalHost: Host;
  coordinates: CoordinatesWithCity;
  rentalTitle: string;
  rentalImages: string[];
  rentalPrice: number;
  rentalRating: number;
  rentalType: OFFER_TYPES;
  isPremium: boolean;
  isBookmark: boolean;
  rentalDescription: string[];
  rentalRoomsQuantity: number;
  rentalMaxGuestsQuantity: number;
  rentalFeatures: string[];
};

export type Location = {
  city: string;
  cityCoordinates: Coordinates;
};

type OffersWithLocation = {
  location: Location;
  offers: Array<Offer>;
};

export type Offers = Array<OffersWithLocation>;

type OffersWithCity = {
  city: string;
  offers: Array<Offer>;
};

export type FavoriteOffers = Array<OffersWithCity>;
