import {createReducer} from '@reduxjs/toolkit';
import {setDataLoadedStatus, changeCity, loadOffers, requireAuthorization} from './action';
import {CITIES, AuthorizationStatus} from '../const';
import {Offers} from '../types/offer';

type InitalState = {
  currentCity: string,
  offers: Offers,
  authorizationStatus: AuthorizationStatus,
  isDataLoaded: boolean;
}

const initialState: InitalState = {
  currentCity: CITIES[0],
  offers: [],
  authorizationStatus: AuthorizationStatus.Unknown,
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
    });
});

export {reducer};
