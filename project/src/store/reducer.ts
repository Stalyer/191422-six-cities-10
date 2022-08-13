import {createReducer} from '@reduxjs/toolkit';
import {setDataLoadedStatus, changeCity, loadOffers, requireAuthorization, saveUserInfo} from './action';
import {CITIES, AuthorizationStatus} from '../const';
import {Offers} from '../types/offer';
import {UserData} from '../types/user-data';

type InitalState = {
  currentCity: string,
  offers: Offers,
  authorizationStatus: AuthorizationStatus,
  userInfo: UserData,
  isDataLoaded: boolean;
}

const initialState: InitalState = {
  currentCity: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userInfo: {
    id: 0,
    email: '',
    avatarUrl: '',
    name: '',
    token: '',
    isPro: false
  },
  isDataLoaded: false
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.currentCity = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(loadOffers, (state, action) => {
      state.offers = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(saveUserInfo, (state, action) => {
      state.userInfo = action.payload;
    });
});

export {reducer};
