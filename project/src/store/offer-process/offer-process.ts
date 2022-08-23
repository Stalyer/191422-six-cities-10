import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {OfferProcess} from '../../types/state';
import {fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction, addReviewAction} from '../api-actions';
import {toast} from 'react-toastify';

const initialState: OfferProcess = {
  offer: null,
  nearbyOffers: [],
  reviews: [],
  isDataLoaded: false
};

export const offerProcess = createSlice({
  name: NameSpace.Offer,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchOfferAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchOfferAction.fulfilled, (state, action) => {
        state.offer = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchOfferAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchNearbyOffersAction.fulfilled, (state, action) => {
        state.nearbyOffers = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchNearbyOffersAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchReviewsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchReviewsAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchReviewsAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(addReviewAction.rejected, () => {
        toast('There was an error adding your review, please try again later');
      })
      .addCase(addReviewAction.fulfilled, (state, action) => {
        state.reviews = action.payload;
      });
  }
});
