import {createAction} from '@reduxjs/toolkit';
import {Films, Film, Genre} from '../types/films';
import {Reviews} from '../types/reviews';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

export const filterFilms = createAction('films/initFilms');

export const changeGenre = createAction<Genre>('films/changeGenre');

export const loadFilms = createAction<Films>('data/loadFilms');

export const loadFilm = createAction<Film>('data/loadFilm');

export const loadSimilarFilms = createAction<Films>('data/loadSimilarFilms');

export const loadPromo = createAction<Film>('data/loadPromo');

export const loadReviews = createAction<Reviews>('data/loadReviews');

export const loadFavoriteFilms = createAction<Films>('data/loadFavorite');

export const setDataLoadedStatus = createAction<boolean>('data/setDataLoadedStatus');

export const requireAuthorization = createAction<AuthorizationStatus>('user/requireAuthorization');

export const setUserData = createAction<UserData | null>('films/setUserData');

export const setError = createAction<string | null>('game/setError');

