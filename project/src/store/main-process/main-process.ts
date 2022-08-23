import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, CITIES, SortType} from '../../const';
import {MainProcess} from '../../types/state';

const initialState: MainProcess = {
  currentCity: CITIES[0],
  currentSorting: SortType.popular
};

export const mainProcess = createSlice({
  name: NameSpace.Main,
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

export const {changeCity, changeSorting} = mainProcess.actions;
