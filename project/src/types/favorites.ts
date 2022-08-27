import {Offers} from './offer';

export type Favorite = {
  cityName: string,
  offers: Offers
};

export type Favorites = Favorite[];
