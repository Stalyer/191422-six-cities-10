import {offerProcess} from './offer-process';
import {OfferProcess} from '../../types/state';
import {makeFakeOffer, makeFakeOffers, makeFakeReviews} from '../../utils/mocks';
import {fetchOfferAction, fetchNearbyOffersAction, fetchReviewsAction, changeFavoriteStatusAction} from '../api-actions';

const fakeOffer = makeFakeOffer();
const fakeOffers = makeFakeOffers();
const fakeReviews = makeFakeReviews();
const fakeOfferFavoriteChanged = Object.assign({}, fakeOffer);
fakeOfferFavoriteChanged.isFavorite = false;

describe('Reducer: offer', () => {
  let state: OfferProcess;

  beforeEach(() => {
    state = {
      offer: null,
      nearbyOffers: [],
      reviews: [],
      isDataLoaded: false
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(offerProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        offer: null,
        nearbyOffers: [],
        reviews: [],
        isDataLoaded: false
      });
  });

  describe('fetchOfferAction test', () => {
    it('should change status isDataLoaded while waiting for offer to load', () => {
      expect(offerProcess.reducer(state, {type: fetchOfferAction.pending.type}))
        .toEqual({...state, isDataLoaded: true});
    });
    it('should update offer', () => {
      expect(offerProcess.reducer(state, {type: fetchOfferAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({...state, offer: fakeOffer});
    });
    it('should change status isDataLoaded on error', () => {
      expect(offerProcess.reducer(state, {type: fetchOfferAction.rejected.type}))
        .toEqual({...state, isDataLoaded: false});
    });
  });

  describe('fetchNearbyOffersAction test', () => {
    it('should change status isDataLoaded while waiting for nearbyOffers to load', () => {
      expect(offerProcess.reducer(state, {type: fetchNearbyOffersAction.pending.type}))
        .toEqual({...state, isDataLoaded: true});
    });
    it('should update nearbyOffers', () => {
      expect(offerProcess.reducer(state, {type: fetchNearbyOffersAction.fulfilled.type, payload: fakeOffers}))
        .toEqual({...state, nearbyOffers: fakeOffers});
    });
    it('should change status isDataLoaded on error', () => {
      expect(offerProcess.reducer(state, {type: fetchNearbyOffersAction.rejected.type}))
        .toEqual({...state, isDataLoaded: false});
    });
  });

  describe('fetchReviewsAction test', () => {
    it('should change status isDataLoaded while waiting for reviews to load', () => {
      expect(offerProcess.reducer(state, {type: fetchReviewsAction.pending.type}))
        .toEqual({...state, isDataLoaded: true});
    });
    it('should update reviews', () => {
      expect(offerProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviews: fakeReviews});
    });
    it('should change status isDataLoaded on error', () => {
      expect(offerProcess.reducer(state, {type: fetchReviewsAction.rejected.type}))
        .toEqual({...state, isDataLoaded: false});
    });
  });

  describe('addReviewAction test', () => {
    it('should update the store after successful submission of review', () => {
      expect(offerProcess.reducer(state, {type: fetchReviewsAction.fulfilled.type, payload: fakeReviews}))
        .toEqual({...state, reviews: fakeReviews});
    });
  });

  describe('changeFavoriteStatusAction test', () => {
    it('should update offer isFavorite status', () => {
      state = {...state, offer: fakeOfferFavoriteChanged};
      expect(offerProcess.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({...state, offer: fakeOffer});
    });
    it('should update nearbyOffers isFavorite status', () => {
      state = {...state, nearbyOffers: [fakeOfferFavoriteChanged]};
      expect(offerProcess.reducer(state, {type: changeFavoriteStatusAction.fulfilled.type, payload: fakeOffer}))
        .toEqual({...state, nearbyOffers: [fakeOffer]});
    });
  });
});
