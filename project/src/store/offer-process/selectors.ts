import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

export const getOffer = (state: State): Offer | null => state[NameSpace.Offer].offer;
export const getOffersNearby = (state: State): Offers => state[NameSpace.Offer].nearbyOffers;
export const getReviews = (state: State): Reviews => state[NameSpace.Offer].reviews;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Offer].isDataLoaded;
