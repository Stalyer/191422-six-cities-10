import {mainProcess, changeCity, changeSorting} from './main-process';
import {MainProcess} from '../../types/state';
import {CITIES, SortType} from '../../const';

describe('Reducer: main', () => {
  let state: MainProcess;

  beforeEach(() => {
    state = {
      currentCity: CITIES[0],
      currentSorting: SortType.popular
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(mainProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({currentCity: CITIES[0], currentSorting: SortType.popular});
  });

  it('should change the current city', () => {
    expect(mainProcess.reducer(state, changeCity(CITIES[1])))
      .toEqual({...state, currentCity: CITIES[1]});
  });

  it('should change the current sorting', () => {
    expect(mainProcess.reducer(state, changeSorting(SortType.topRated)))
      .toEqual({...state, currentSorting: SortType.topRated});
  });
});
