import {createAction} from '@reduxjs/toolkit';
import {Offers} from '../types/offer';
import {AuthorizationStatus} from '../const';

export const changeCity = createAction<string>('offer/changeCity');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const loadOffers = createAction<Offers>('data/loadOffers');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');
