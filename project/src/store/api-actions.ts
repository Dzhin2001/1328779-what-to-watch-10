import {AxiosInstance} from 'axios';
import {createAsyncThunk} from '@reduxjs/toolkit';
import {AppDispatch, State} from '../types/state.js';
import {Films, Film, FavoriteFilm} from '../types/films';
import {Reviews, UserReview} from '../types/reviews';
import {APIRoute} from '../const';
import {AuthData} from '../types/auth-data';
import {UserData} from '../types/user-data';
import {saveToken} from '../services/token';
import {redirectToBack} from './action';

export const fetchFilmsAction = createAsyncThunk<Films, undefined, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(APIRoute.Films);
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
    return data;
  },
);

export const fetchSimilarFilmsAction = createAsyncThunk<Films, string, {
  dispatch: AppDispatch,
  state: State,
  extra: AxiosInstance
}>(
  'data/fetchSimilarFilms',
  async (_arg, {dispatch, extra: api}) => {
    const {data} = await api.get<Films>(`${APIRoute.Films}/${_arg}/similar`);
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
    dispatch(redirectToBack());
    return data;
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
    saveToken(data.token);
    return data;
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
    saveToken(data.token);
    dispatch(fetchFavoriteFilmsAction());
    return data;
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
  },
);
