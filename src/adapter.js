import {capitalizeFirstLetter} from './utils';

export const mapServerCityOfferToClient = (data) => {
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
      mapServerOfferToClient(data),
    ],
  };
};

export const mapServerOfferToClient = (data) => {
  return {
    id: data.id,
    coordinates: {
      latitude: data.location.latitude,
      longitude: data.location.longitude,
      zoom: data.location.zoom,
      city: data.city.name,
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
