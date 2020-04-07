import {OFFER_TYPES} from './consts';

type User = {
  id: number;
  name: string;
  isPro: boolean;
  avatar: string;
};

export type Coordinate = [number, number];

export type ReviewShape = {
  id: number;
  user: User;
  rating: number;
  date: object;
  comment: string;
};

export type ReviewsShape = Array<ReviewShape>;

export type HostShape = {
  id: number;
  hostAvatar: string;
  hostName: string;
  isSuper: boolean;
};

export type CoordinatesShape = {
  latitude: number;
  longitude: number;
  zoom: number;
};

export type CoordinatesWithCityShape = {
  latitude: number;
  longitude: number;
  zoom: number;
  city: string;
};

export type OfferShape = {
  id: number;
  rentalHost: HostShape;
  coordinates: CoordinatesWithCityShape;
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

export type LocationShape = {
  city: string;
  cityCoordinates: CoordinatesShape;
};

type ShapeWithLocation = {
  location: LocationShape;
  offers: Array<OfferShape>;
};

export type OffersShape = Array<ShapeWithLocation>;

type ShapeWithCity = {
  city: string;
  offers: Array<OfferShape>;
};

export type FavoritesShape = Array<ShapeWithCity>;
