import {store} from '../store/index';
import {Offers} from './offer';
import {UserData} from './user-data';
import {AuthorizationStatus} from '../const';

export type OfferData = {
  offers: Offers,
  isDataLoaded: boolean;
}

export type OfferProcess = {
  currentCity: string,
}

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userInfo: UserData;
};

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
