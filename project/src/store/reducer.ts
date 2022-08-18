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
  setError, setPromoFilm,
} from './action';
import {Films, Film, Genre} from '../types/films';
import {Reviews} from '../types/reviews';
import {DEFAULT_GENRE, AuthorizationStatus} from '../const';
import {getGenres, getFiltredFilms} from '../utils/films';

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
    })
    .addCase(loadFilm, (state, action) => {
      state.film = action.payload;
    })
    .addCase(loadSimilarFilms, (state, action) => {
      state.similarFilms = action.payload;
    })
    .addCase(loadPromo, (state, action) => {
      state.promoFilm = action.payload;
    })
    .addCase(setPromoFilm, (state) => {
      if (state.film && state.promoFilm) {
        if (state.film.id !== state.promoFilm.id) {
          state.film = state.promoFilm;
        }
      }
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadFavoriteFilms, (state, action) => {
      state.favoriteFilms = action.payload;
    })
    .addCase(setDataLoadedStatus, (state, action) => {
      state.isDataLoaded = action.payload;
    })
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(setError, (state, action) => {
      state.error = action.payload;
    });
});

export {reducer};
