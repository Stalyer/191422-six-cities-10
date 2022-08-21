import {store} from '../store/index';
import {Offer, Offers} from './offer';
import {Reviews} from './review';
import {UserData} from './user-data';
import {AuthorizationStatus, SortType} from '../const';

export type OfferData = {
  offer: Offer | null,
  offers: Offers,
  nearbyOffers: Offers,
  favoriteOffers: Offers,
  reviews: Reviews,
  isDataLoaded: boolean;
}

export type OfferProcess = {
  currentCity: string,
  currentSorting: SortType;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: UserData;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
