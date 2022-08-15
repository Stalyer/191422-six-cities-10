import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITIES} from '../../const';
import {OfferProcess} from '../../types/state';

const initialState: OfferProcess = {
  currentCity: CITIES[0]
};

export const offerProcess = createSlice({
  name: NameSpace.Data,
  initialState,
  reducers: {
    changeCity: (state, action) => {
      state.currentCity = action.payload;
    }
  }
});

export const {changeCity} = offerProcess.actions;
