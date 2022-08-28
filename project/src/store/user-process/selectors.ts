import {AuthorizationStatus, NameSpace} from '../../const';
import {State} from '../../types/state';
import {Films} from '../../types/films';
import {UserData} from '../../types/user-data';


export const getFavoriteFilms = (state: State): Films => state[NameSpace.User].favoriteFilms;
export const getUserData = (state: State): UserData | null => state[NameSpace.User].userData;
export const getAuthorizationStatus = (state: State): AuthorizationStatus => state[NameSpace.User].authorizationStatus;
