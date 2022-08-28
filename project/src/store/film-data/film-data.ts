import {createSlice} from '@reduxjs/toolkit';
import {NameSpace} from '../../const';
import {FilmData} from '../../types/state';
import {
  fetchFilmAction,
  fetchFilmsAction,
  fetchPromoAction,
  fetchSimilarFilmsAction,
} from '../api-actions';

const initialState: FilmData = {
  initialFilms: [],
  promoFilm: null,
  film: null,
  similarFilms: [],
  isDataLoaded: false,
};

export const filmData = createSlice({
  name: NameSpace.Film,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmsAction.fulfilled, (state, action) => {
        state.initialFilms = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmsAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchFilmAction.fulfilled, (state, action) => {
        state.film = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchFilmAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchSimilarFilmsAction.fulfilled, (state, action) => {
        state.similarFilms = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchSimilarFilmsAction.rejected, (state) => {
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.pending, (state) => {
        state.isDataLoaded = true;
      })
      .addCase(fetchPromoAction.fulfilled, (state, action) => {
        state.promoFilm = action.payload;
        state.isDataLoaded = false;
      })
      .addCase(fetchPromoAction.rejected, (state) => {
        state.isDataLoaded = false;
      });
  }
});
