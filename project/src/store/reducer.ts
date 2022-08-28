import {createReducer} from '@reduxjs/toolkit';
// import {
  // loadFilms,
  // loadFilm,
  // loadSimilarFilms,
  // loadPromo,
  // loadReviews,
  // loadFavoriteFilms,
  // requireAuthorization,
  // setDataLoadedStatus,
  // setUserData,
  // setError,
  // setFormBlockedStatus,
// } from './action';
import {Films, Film} from '../types/films';
import {Reviews} from '../types/reviews';
import {AuthorizationStatus} from '../const';
import {UserData} from '../types/user-data';

type InitialState = {
  film: Film | null,
  promoFilm: Film | null,
  initialFilms: Films,
  similarFilms: Films,
  favoriteFilms: Films,
  reviews: Reviews,
  isFormBlocked: boolean,
  authorizationStatus: AuthorizationStatus,
  userData: UserData | null,
  isDataLoaded: boolean,
  error: string | null,
}

const initialState: InitialState = {
  promoFilm: null,
  film: null,
  initialFilms: [],
  similarFilms: [],
  favoriteFilms: [],
  reviews: [],
  isFormBlocked: false,
  authorizationStatus: AuthorizationStatus.Unknown,
  userData: null,
  isDataLoaded: false,
  error: null,
};
//
// const reducer = createReducer(initialState, (builder) => {
//   builder
    // .addCase(loadFilms, (state, action) => {
    //   state.initialFilms = action.payload;
    //   state.isDataLoaded = false;
    // })
    // .addCase(loadFilm, (state, action) => {
    //   state.film = action.payload;
    //   state.isDataLoaded = false;
    // })
    // .addCase(loadSimilarFilms, (state, action) => {
    //   state.similarFilms = action.payload;
    //   state.isDataLoaded = false;
    // })
    // .addCase(loadPromo, (state, action) => {
    //   state.promoFilm = action.payload;
    //   state.film = action.payload;
    //   state.isDataLoaded = false;
    // })
    // .addCase(loadReviews, (state, action) => {
    //   state.reviews = action.payload;
    //   state.isDataLoaded = false;
    //   state.isFormBlocked = false;
    // })
    // .addCase(loadFavoriteFilms, (state, action) => {
    //   state.favoriteFilms = action.payload;
    // })
    // .addCase(setDataLoadedStatus, (state, action) => {
    //   state.isDataLoaded = action.payload;
    // })
    // .addCase(setFormBlockedStatus, (state, action) => {
    //   state.isFormBlocked = action.payload;
    // })
    // .addCase(requireAuthorization, (state, action) => {
    //   state.authorizationStatus = action.payload;
    // })
    // .addCase(setUserData, (state, action) => {
    //   state.userData = action.payload;
    // })
    // .addCase(setError, (state, action) => {
    //   state.error = action.payload;
    // });
// });
//
// export {reducer};
