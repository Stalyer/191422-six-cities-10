import {store} from '../store/index';
import {Offer, Offers} from './offer';
import {Reviews} from './review';
import {UserData} from './user-data';
import {AuthorizationStatus, SortType} from '../const';

export type OffersProcess = {
  offers: Offers,
  favoriteOffers: Offers,
  isDataLoaded: boolean;
}

export type OfferProcess = {
  offer: Offer | null,
  nearbyOffers: Offers,
  reviews: Reviews,
  isDataLoaded: boolean;
}

export type MainProcess = {
  currentCity: string,
  currentSorting: SortType;
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: UserData | null;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
