import {Genre} from './types/films';

enum APIRoute {
  Films = '/films',
  Promo = '/promo',
  Favorite = '/favorite',
  Comments = '/comments',
  Login = '/login',
  Logout = '/logout',
}

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
const TIMEOUT_SHOW_ERROR = 2000;

enum NameSpace {
  Film = 'FILM',
  Review = 'REVIEW',
  User = 'USER',
}

export {APIRoute, AppRoute, AuthorizationStatus, NameSpace, DEFAULT_GENRE, DEFAULT_FILM_COUNT, DEFAULT_LIKED_FILM_COUNT, TIMEOUT_SHOW_ERROR};
