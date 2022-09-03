import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {
  checkAuthAction,
  fetchFavoriteFilmsAction,
  loginAction,
  logoutAction, postFavoriteFilmAction
} from '../api-actions';
import {dropToken} from '../../services/token';

const initialState: UserProcess = {
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  favoriteFilms: [],
};

export const userProcess = createSlice({
  name: NameSpace.User,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(checkAuthAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(checkAuthAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
        dropToken();
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      })
      .addCase(postFavoriteFilmAction.fulfilled, (state, action) => {
        const film = action.payload;
        if (film.isFavorite)
        {
          state.favoriteFilms.push(film);
        } else {
          state.favoriteFilms = state.favoriteFilms.filter( (element) => element.id !== film.id);
        }
      });
  }
});
