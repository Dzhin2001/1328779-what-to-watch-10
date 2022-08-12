import {createReducer} from '@reduxjs/toolkit';
import {changeGenre, initFilms} from './action';
import {films} from '../mocks/films';
import {DEFAULT_GENRE} from '../const';
import {getGenres} from '../utils/films';

const initialState = {
  genre: DEFAULT_GENRE,
  actualGenre: DEFAULT_GENRE,
  genres: getGenres(films),
  filteredFilms: films,
};

const reducer = createReducer(initialState, (builder) => {
  builder
    .addCase(initFilms, (state) => {
      if (state.genre === state.actualGenre) {
        return;
      }
      state.genre = state.actualGenre;
      state.filteredFilms = films;
      if (state.genre !== 'All genres') {
        state.filteredFilms = films.filter((e) => e.genre === state.genre)
      }
    })
    .addCase(changeGenre, (state, action) => {
      state.actualGenre = action.payload;
    });
});

export {reducer};
