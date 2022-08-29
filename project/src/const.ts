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

enum CommentSetting {
  MinLength = 50,
  MaxLength = 400,
}

const PASSWORD_REGEXP = /(?=.*[0-9])(?=.*[a-zA-Z])[0-9a-zA-Z!@#$%^&*]/g;

export {APIRoute, AppRoute, AuthorizationStatus, NameSpace, DEFAULT_GENRE, DEFAULT_FILM_COUNT, DEFAULT_LIKED_FILM_COUNT, TIMEOUT_SHOW_ERROR, PASSWORD_REGEXP, CommentSetting};
