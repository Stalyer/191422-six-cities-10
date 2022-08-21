import {RATING_STARS_MAX, RATING_WIDTH} from './const';
import {Offer} from './types/offer';

export const calcWidthRating = (value: number) => value / RATING_STARS_MAX * RATING_WIDTH;

export const sortOfferPriceAsc = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const sortOfferPriceDesc = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
export const sortOfferTopRated = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;
