import {combineReducers} from '@reduxjs/toolkit';
import {NameSpace} from '../const';
import {offersProcess} from './offers-process/offers-process';
import {offerProcess} from './offer-process/offer-process';
import {mainProcess} from './main-process/main-process';
import {userProcess} from './user-process/user-process';

export const rootReducer = combineReducers({
  [NameSpace.Offers]: offersProcess.reducer,
  [NameSpace.Offer]: offerProcess.reducer,
  [NameSpace.Main]: mainProcess.reducer,
  [NameSpace.User]: userProcess.reducer,
});
