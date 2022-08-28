import {store} from '../store/index.js';
import {AuthorizationStatus} from '../const';
import {UserData} from './user-data';
import {Film, Films} from './films';
import {Reviews} from './reviews';

export type State = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type UserProcess = {
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  favoriteFilms: Films,
};

export type FilmData = {
  initialFilms: Films,
  promoFilm: Film | null,
  film: Film | null,
  similarFilms: Films,
  isDataLoaded: boolean,
};

export type ReviewData = {
  reviews: Reviews,
  isDataLoaded: boolean,
  isFormBlocked: boolean,
};
