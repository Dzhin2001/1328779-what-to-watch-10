import {createSlice} from '@reduxjs/toolkit';
import {NameSpace, AuthorizationStatus} from '../../const';
import {UserProcess} from '../../types/state';
import {
  checkAuthAction,
  fetchFavoriteFilmsAction,
  loginAction,
  logoutAction,
  postFavoriteFilmAction
} from '../api-actions';
import {saveToken, dropToken} from '../../services/token';

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
        console.log('checkAuthAction.fulfilled');
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        saveToken(state.userData.token);
      })
      .addCase(checkAuthAction.rejected, (state) => {
        console.log('checkAuthAction.rejected');
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
        dropToken();
      })
      .addCase(loginAction.fulfilled, (state, action) => {
        state.authorizationStatus = AuthorizationStatus.Auth;
        state.userData = action.payload;
        saveToken(state.userData.token);
      })
      .addCase(loginAction.rejected, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
        dropToken();
      })
      .addCase(logoutAction.fulfilled, (state) => {
        state.authorizationStatus = AuthorizationStatus.NoAuth;
        state.userData = null;
        state.favoriteFilms = [];
        dropToken();
      })
      .addCase(fetchFavoriteFilmsAction.fulfilled, (state, action) => {
        state.favoriteFilms = action.payload;
      });
  }
});
