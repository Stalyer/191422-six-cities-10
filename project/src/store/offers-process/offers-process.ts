import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import {fetchOffersAction, fetchFavoriteOffersAction} from '../api-actions';

const initialState: OffersProcess = {
  offers: [],
  favoriteOffers: [],
  isDataLoaded: false
};

export const offersProcess = createSlice({
  name: NameSpace.Offers,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOffersAction.fulfilled, (state, action) => {
        state.offers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isDataLoaded = false;
      });
  }
});
