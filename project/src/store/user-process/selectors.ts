import {NameSpace} from '../../const';
import {State} from '../../types/state';
import {UserData} from '../../types/user-data';
import {AuthorizationStatus} from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
export const getUserInfo = (state: State): UserData | null => state[NameSpace.User].userInfo;
