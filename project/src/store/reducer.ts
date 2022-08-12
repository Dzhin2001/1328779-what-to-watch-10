import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, filterFilms, initFilmsCount, incFilmsCount} from './action';
import {films} from '../mocks/films';
import {DEFAULT_GENRE, DEFAULT_FILM_COUNT} from '../const';
import {getGenres} from '../utils/films';

const initialState = {
  genre: DEFAULT_GENRE,
  actualGenre: DEFAULT_GENRE,
  genres: getGenres(films),
  initialFilms: films,
  filteredFilms: films,
  filmCount: DEFAULT_FILM_COUNT,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(filterFilms, (state) => {
      if (state.genre === state.actualGenre) {
        return;
      }
      state.filteredFilms = films;
      if (state.actualGenre !== 'All genres') {
        state.filteredFilms = films.filter((e) => e.genre === state.actualGenre);
      }
      state.genre = state.actualGenre;
    })
    .addCase(changeGenre, (state, action) => {
      state.actualGenre = action.payload;
    })
    .addCase(initFilmsCount, (state) => {
      const countFilms = state.filteredFilms.length;
      state.filmCount = DEFAULT_FILM_COUNT < countFilms ? DEFAULT_FILM_COUNT : countFilms;
    })
    .addCase(incFilmsCount, (state) => {
      const countFilms = state.filteredFilms.length;
      state.filmCount = state.filmCount + DEFAULT_FILM_COUNT < countFilms ? state.filmCount + DEFAULT_FILM_COUNT : countFilms;
    });
});

export {reducer};
