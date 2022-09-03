import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OffersProcess} from '../../types/state';
import {fetchOffersAction, fetchFavoriteOffersAction, changeFavoriteStatusAction} from '../api-actions';

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
      .addCase(fetchOffersAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFavoriteOffersAction.fulfilled, (state, action) => {
        state.favoriteOffers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFavoriteOffersAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(changeFavoriteStatusAction.fulfilled, (state, action) => {
        const updatedOffer = action.payload;
        const currentOffer = state.offers.find((offer) => offer.id === updatedOffer.id);

        if (currentOffer) {
          currentOffer.isFavorite = updatedOffer.isFavorite;
        }

        if (updatedOffer.isFavorite) {
          state.favoriteOffers.push(updatedOffer);
        } else {
          state.favoriteOffers.forEach((favoriteOffer, index) => {
            if (favoriteOffer.id === updatedOffer.id) {
              state.favoriteOffers.splice(index, 1);
            }
          });
        }
      });
  }
});
