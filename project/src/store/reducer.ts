import {createReducer} from '@reduxjs/toolkit';
import {changeCity} from './action';
import {CITIES} from '../const';
import {offers} from '../mocks/offers';

const initialState = {
  currentCity: CITIES[0],
  offers
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      const city = action.payload;
      state.currentCity = city;
    });
});

export {reducer};
