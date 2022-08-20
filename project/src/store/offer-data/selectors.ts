import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offer, Offers} from '../../types/offer';
import {Reviews} from '../../types/review';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getOffersFavorite = (state: State): Offers => state[NameSpace.Data].favoriteOffers;
export const getOffersNearby = (state: State): Offers => state[NameSpace.Data].nearbyOffers;
export const getOffer = (state: State): Offer | null => state[NameSpace.Data].offer;
export const getReviews = (state: State): Reviews => state[NameSpace.Data].reviews;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
