import {Genre} from './types/films';

enum AppRoute {
  Main = '/',
  SignIn = '/login',
  MyList = '/mylist',
  Film = '/films/:id',
  AddReview = '/films/:id/review',
  Player = '/player/:id',
}

enum AuthorizationStatus {
  Auth = 'AUTH',
  NoAuth = 'NO_AUTH',
  Unknown = 'UNKNOWN',
}

const DEFAULT_GENRE: Genre = 'All genres';

const DEFAULT_FILM_COUNT = 8;
const DEFAULT_LIKED_FILM_COUNT = 4;

export {AppRoute, AuthorizationStatus, DEFAULT_GENRE, DEFAULT_FILM_COUNT, DEFAULT_LIKED_FILM_COUNT};
