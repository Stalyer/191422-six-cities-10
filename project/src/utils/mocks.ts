import {internet, datatype, lorem, image, date} from 'faker';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {NameSpace, AuthorizationStatus, CITIES, SortType} from '../const';
import {Offer, Offers} from '../types/offer';
import {UserData} from '../types/user-data';
import {Reviews} from '../types/review';

const store = configureMockStore();

export const makeFakeStore = store({
  [NameSpace.Offers]: {
    offers: [],
    favoriteOffers: [],
    isDataLoaded: false
  },
  [NameSpace.Offer]: {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isDataLoaded: false
  },
  [NameSpace.Main]: {
    currentCity: CITIES[0],
    currentSorting: SortType.popular
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null
  }
});

export const makeFakeOffers = (): Offers => ([{
  id: datatype.number(10),
  title: lorem.word(5),
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  type: 'apartment',
  previewImage: image.imageUrl(),
  images: [image.imageUrl()],
  price: 120,
  rating: 4.8,
  isFavorite: true,
  isPremium: true,
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: 'Paris'
  },
  bedrooms: 2,
  goods: ['Heating'],
  maxAdults: 2,
  host: {
    avatarUrl: internet.avatar(),
    id: 2,
    isPro: true,
    name: internet.userName()
  }
}] as Offers);

export const makeFakeOffer = (): Offer => ({
  id: datatype.number(10),
  title: lorem.word(5),
  description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
  type: 'apartment',
  previewImage: image.imageUrl(),
  images: [image.imageUrl()],
  price: 120,
  rating: 4.8,
  isFavorite: true,
  isPremium: datatype.boolean(),
  location: {
    latitude: 52.35514938496378,
    longitude: 4.673877537499948,
    zoom: 8
  },
  city: {
    location: {
      latitude: 52.370216,
      longitude: 4.895168,
      zoom: 10
    },
    name: 'Paris'
  },
  bedrooms: 2,
  goods: ['Heating'],
  maxAdults: 2,
  host: {
    avatarUrl: internet.avatar(),
    id: 2,
    isPro: datatype.boolean(),
    name: internet.userName()
  }
} as Offer);

export const makeFakeUser = (): UserData => ({
  id: datatype.number(10),
  email: internet.email(),
  avatarUrl: internet.avatar(),
  name: internet.userName(),
  token: 'secret',
  isPro: datatype.boolean(),
} as UserData);


export const makeFakeReviews = (): Reviews => [{
  id: datatype.number(10),
  comment: lorem.word(10),
  date: String(date.recent),
  rating: datatype.number(5),
  user: {
    avatarUrl: internet.avatar(),
    id: datatype.number(10),
    isPro: datatype.boolean(),
    name: internet.userName()
  }
}];
