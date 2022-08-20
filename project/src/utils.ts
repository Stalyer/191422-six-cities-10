import {RATING_STARS_MAX, RATING_WIDTH} from './const';

export const calcWidthRating = (value: number) => value / RATING_STARS_MAX * RATING_WIDTH;
