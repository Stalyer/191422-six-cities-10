import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITIES, SortType} from '../../const';
import {OfferProcess} from '../../types/state';

const initialState: OfferProcess = {
  currentCity: CITIES[0],
  currentSorting: SortType.popular
};

export const offerProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.currentCity = action.payload;
    },
    changeSorting: (state, action) => {
      state.currentSorting = action.payload;
    }
  }
});

export const {changeCity, changeSorting} = offerProcess.actions;
