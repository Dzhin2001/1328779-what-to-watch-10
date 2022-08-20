import {createReducer} from '@reduxjs/toolkit';
import {
  changeGenre,
  filterFilms,
  loadFilms,
  loadFilm,
  loadSimilarFilms,
  loadPromo,
  loadReviews,
  loadFavoriteFilms,
  requireAuthorization,
  setDataLoadedStatus,
  setUserData,
  setError,
} from './action';
import {Films, Film, Genre} from '../types/films';
import {Reviews} from '../types/reviews';
import {DEFAULT_GENRE, AuthorizationStatus} from '../const';
import {getGenres, getFiltredFilms} from '../utils/films';
import {UserData} from '../types/user-data';

type InitialState = {
  genre: Genre,
  actualGenre: Genre,
  genres: Genre[],
  film: Film | null,
  promoFilm: Film | null,
  initialFilms: Films,
  filteredFilms: Films,
  similarFilms: Films,
  favoriteFilms: Films,
  reviews: Reviews,
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  isDataLoaded: boolean,
  error: string | null,
}

const initialState: InitialState = {
  genre: DEFAULT_GENRE,
  actualGenre: DEFAULT_GENRE,
  genres: [],
  promoFilm: null,
  film: null,
  initialFilms: [],
  filteredFilms: [],
  similarFilms: [],
  favoriteFilms: [],
  reviews: [],
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isDataLoaded: false,
  error: null,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterFilms, (state) => {
      if (state.genre === state.actualGenre) {
        return;
      }
      state.filteredFilms = getFiltredFilms(state.initialFilms, state.actualGenre);
      state.genre = state.actualGenre;
    })
    .addCase(changeGenre, (state, action) => {
      state.actualGenre = action.payload;
    })
    .addCase(loadFilms, (state, action) => {
      state.initialFilms = action.payload;
      state.genres = getGenres(action.payload);
      state.filteredFilms = getFiltredFilms(action.payload, state.actualGenre);
      state.isDataLoaded = false;
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
      state.film = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
      state.isDataLoaded = false;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setUserData, (state, action) => {
      state.userData = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
