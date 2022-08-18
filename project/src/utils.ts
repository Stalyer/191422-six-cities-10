import {RATING_STARS_MAX} from './const';

export const calcWidthRating = (value: number) => value / RATING_STARS_MAX * 100;
