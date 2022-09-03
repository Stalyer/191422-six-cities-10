import {RATING_STARS_MAX, RATING_WIDTH, CITIES} from '../const';
import {Offers, Offer} from '../types/offer';
import {Favorites} from '../types/favorites';

export const calcWidthRating = (value: number) => value / RATING_STARS_MAX * RATING_WIDTH;

export const filterOfferToCity = (offers: Offers) => {
  const filterOffers : Favorites = [];

  CITIES.forEach((city) => {
    const currentCityOffers = offers.filter((offer) => offer.city.name === city);
    if (currentCityOffers.length > 0 ) {
      filterOffers.push({
        cityName: city,
        offers: currentCityOffers
      });
    }
  });

  return filterOffers;
};

export const sortOfferPriceAsc = (offerA: Offer, offerB: Offer) => offerA.price - offerB.price;
export const sortOfferPriceDesc = (offerA: Offer, offerB: Offer) => offerB.price - offerA.price;
export const sortOfferTopRated = (offerA: Offer, offerB: Offer) => offerB.rating - offerA.rating;
