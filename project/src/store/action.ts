import {createAction} from '@reduxjs/toolkit';
import {Films, Film, Genre} from '../types/films';
import {Reviews} from '../types/reviews';
// import {AuthorizationStatus} from '../const';
// import {UserData} from '../types/user-data';

// export const loadFilms = createAction<Films>('data/loadFilms');

// export const loadFilm = createAction<Film>('data/loadFilm');

// export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

// export const loadPromo = createAction<Film>('data/loadPromo');

// export const loadReviews = createAction<Reviews>('data/loadReviews');

// export const loadFavoriteFilms = createAction<Films>('data/loadFavorite');

// export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

// export const setFormBlockedStatus = createAction<boolean>('data/setFormBlockedStatus');

// export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

// export const setUserData = createAction<UserData | null>('user/setUserData');

// export const setError = createAction<string | null>('user/setError');

export const redirectToRoute = createAction<string>('route/redirectToRoute');

export const redirectToBack = createAction('route/redirectToBack');
