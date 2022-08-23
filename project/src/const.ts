export enum AppRoute {
  Login = '/login',
  Favorites = '/favorites',
  Room = '/offer',
  Root = '/'
}

export enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN'
}

export enum APIRoute {
  Hotels = '/hotels',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout'
}

export enum NameSpace {
  Offers = 'OFFERS',
  Offer = 'OFFER',
  Main = 'MAIN',
  User = 'USER'
}

export const URL_MARKER_DEFAULT = '/img/pin.svg';
export const URL_MARKER_CURRENT = '/img/pin-active.svg';

export const RATING_STARS_MAX = 5;
export const RATING_WIDTH = 100;
export const REVIEW_ITEMS_MAX = 10;
export const GALLERY_ITEMS_MAX = 6;
export const COMMENT_LENGTH_MIN = 50;
export const COMMENT_LENGTH_MAX = 300;

export const CITIES = [
  'Paris',
  'Cologne',
  'Brussels',
  'Amsterdam',
  'Hamburg',
  'Dusseldorf'
];

export enum OfferCardType {
  Place = 'place-card',
  Property = 'property'
}

export const OFFER_TYPE: { [index: string]: string } = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel'
};

export enum SortType {
  popular = 'popular',
  priceAsc = 'priceAsc',
  priceDesc = 'priceDesc',
  topRated = 'topRated'
}

export const SORT_TYPE_NAME: { [index: string]: string } = {
  popular: 'Popular',
  priceAsc: 'Price: low to high',
  priceDesc: 'Price: high to low',
  topRated: 'Top rated first'
};
