import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {Offers} from '../../types/offer';

export const getOffers = (state: State): Offers => state[NameSpace.Data].offers;
export const getLoadedDataStatus = (state: State): boolean => state[NameSpace.Data].isDataLoaded;
