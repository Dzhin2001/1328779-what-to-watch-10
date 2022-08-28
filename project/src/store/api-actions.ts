import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Films, Film, FavoriteFilm} from '../types/films';
import {Reviews, UserReview} from '../types/reviews';
// import {
  // loadFilms,
  // loadFilm,
  // loadSimilarFilms,
  // loadPromo,
  // loadReviews,
  // loadFavoriteFilms,
  // requireAuthorization,
  // setDataLoadedStatus,
  // setError,
  // setUserData,
  // redirectToRoute,
  // setFormBlockedStatus,
// } from './action';
// import {saveToken, dropToken} from '../services/token';
import {APIRoute, AuthorizationStatus, AppRoute, TIMEOUT_SHOW_ERROR} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {store} from './';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
    // dispatch(setDataLoadedStatus(true));
    // dispatch(loadFilms(data));
    return data;
  },
);

export const fetchFilmAction = createAsyncThunk<Film, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(`${APIRoute.Films}/${_arg}`);
    // dispatch(setDataLoadedStatus(true));
    // dispatch(loadFilm(data));
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${_arg}/similar`);
    // dispatch(setDataLoadedStatus(true));
    // dispatch(loadSimilarFilms(data));
    return data;
  },
);

export const fetchPromoAction = createAsyncThunk<Film, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchPromo',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Film>(APIRoute.Promo);
    // dispatch(setDataLoadedStatus(true));
    // dispatch(loadPromo(data));
    return data;
  },
);

export const fetchReviewsAction = createAsyncThunk<Reviews, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchReviews',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Reviews>(`${APIRoute.Comments}/${_arg}`);
    // dispatch(setDataLoadedStatus(true));
    // dispatch(loadReviews(data));
    return data;
  },
);

export const postNewReviewAction = createAsyncThunk<Reviews, UserReview, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postNewReview',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${_arg.idFilm}`, _arg.newComment);
    return data;
    // try {
    //   const {data} = await api.post<Reviews>(`${APIRoute.Comments}/${_arg.idFilm}`, _arg.newComment);
    //   dispatch(setFormBlockedStatus(true));
    //   dispatch(loadReviews(data));
    //   dispatch(redirectToRoute(`films/${_arg.idFilm}`));
    // } catch {
    //   dispatch(setFormBlockedStatus(false));
    // }
  },
);

export const postFavoriteFilmAction = createAsyncThunk<Film, FavoriteFilm, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/postFavoriteFilm',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.post<Film>(`${APIRoute.Favorite}/${_arg.id}/${_arg.status}`);
    // dispatch(loadFilm(data));
    return data;
  },
);

export const checkAuthAction = createAsyncThunk<UserData, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/checkAuth',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<UserData>(APIRoute.Login);
    dispatch(fetchFavoriteFilmsAction());
    return data;
    // try {
    //   const {data: userData} = await api.get<UserData>(APIRoute.Login);
    //   dispatch(requireAuthorization(AuthorizationStatus.Auth));
    //   dispatch(setUserData(userData));
    //   dispatch(fetchFavoriteFilmsAction());
    // } catch {
    //   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    //   dispatch(loadFavoriteFilms([]));
    // }
  },
);

export const loginAction = createAsyncThunk<UserData, AuthData, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/login',
  async ({email, password}, {dispatch, extra: api}) => {
    const {data} = await api.post<UserData>(APIRoute.Login, {email, password});
    dispatch(fetchFavoriteFilmsAction());
    return data;
    // try {
    //   const {data: userData} = await api.post<UserData>(APIRoute.Login, {email, password});
    //   saveToken(userData.token);
    //   dispatch(setUserData(userData));
    //   dispatch(requireAuthorization(AuthorizationStatus.Auth));
    //   dispatch(redirectToRoute(AppRoute.Main));
    //   dispatch(fetchFavoriteFilmsAction());
    // } catch {
    //   dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    //   dispatch(loadFavoriteFilms([]));
    // }
  },
);

export const fetchFavoriteFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFavorite',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Favorite);
    // dispatch(loadFavoriteFilms(data));
    return data;
  },
);

export const logoutAction = createAsyncThunk<void, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'user/logout',
  async (_arg, {dispatch, extra: api}) => {
    await api.delete(APIRoute.Logout);
    // dropToken();
    // dispatch(setUserData(null));
    // dispatch(requireAuthorization(AuthorizationStatus.NoAuth));
    // dispatch(loadFavoriteFilms([]));
  },
);
