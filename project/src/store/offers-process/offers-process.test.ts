import {offersProcess} from './offers-process';
import {OffersProcess} from '../../types/state';
import {makeFakeOffer, makeFakeOffers} from '../../utils/mocks';
import {fetchOffersAction, fetchFavoriteOffersAction, changeFavoriteStatusAction} from '../api-actions';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeOfferFavoriteChanged = Object.assign({}, fakeOffer);
fakeOfferFavoriteChanged.isFavorite = false;

describe('Reducer: offers', () => {
  let state: OffersProcess;

  beforeEach(() => {
    state = {
      offers: [],
      favoriteOffers: [],
      isDataLoaded: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offersProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offers: [],
        favoriteOffers: [],
        isDataLoaded: false
      });
  });

  describe('fetchOffersAction test', () => {
    it('should change status isDataLoaded while waiting for offers to load', () => {
      expect(offersProcess.reducer(state, {type: fetchOffersAction.pending.type}))
        .toEqual({...state, isDataLoaded: true});
    });
    it('should update offers', () => {
      expect(offersProcess.reducer(state, {type: fetchOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual({...state, offers: fakeOffers});
    });
    it('should change status isDataLoaded on error', () => {
      expect(offersProcess.reducer(state, {type: fetchOffersAction.rejected.type}))
        .toEqual({...state, isDataLoaded: false});
    });
  });

  describe('fetchFavoriteOffersAction test', () => {
    it('should change status isDataLoaded while waiting for favoriteOffers to load', () => {
      expect(offersProcess.reducer(state, {type: fetchFavoriteOffersAction.pending.type}))
        .toEqual({...state, isDataLoaded: true});
    });
    it('should update favoriteOffers', () => {
      expect(offersProcess.reducer(state, {type: fetchFavoriteOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual({...state, favoriteOffers: fakeOffers});
    });
    it('should change status isDataLoaded on error', () => {
      expect(offersProcess.reducer(state, {type: fetchFavoriteOffersAction.rejected.type}))
        .toEqual({...state, isDataLoaded: false});
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should update offers and favoriteOffers isFavorite status', () => {
      state = {...state, offers: [fakeOfferFavoriteChanged]};
      expect(offersProcess.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({...state, offers: [fakeOffer], favoriteOffers: [fakeOffer]});
    });
  });
});
