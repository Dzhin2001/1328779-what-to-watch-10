import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {FavoriteFilm, Film} from '../types/films';
import {createAPI} from '../services/api';
import {
  fetchFilmsAction,
  fetchFilmAction,
  fetchFavoriteFilmsAction,
  checkAuthAction,
  loginAction,
  logoutAction,
  fetchPromoAction,
  fetchSimilarFilmsAction, fetchReviewsAction, postNewReviewAction, postFavoriteFilmAction
} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {
  makeFakeInitialFilms,
  makeFakeFilm,
  makeFakeReviews,
  makeNewComment,
} from '../utils/mocks';
import {redirectToBack} from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];
  const mockStore = configureMockStore<
    State,
    Action,
    ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchFilmsAction before every route', async () => {
    const mockFilms = makeFakeInitialFilms(10);
    mockAPI
      .onGet(APIRoute.Films)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmsAction.pending.type,
      fetchFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFilmAction before every route', async () => {
    const mockFilm = makeFakeFilm();
    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilm.id.toString()}`)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchFilmAction(mockFilm.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFilmAction.pending.type,
      fetchFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchSimilarFilmsAction before every route', async () => {
    const mockFilm = makeFakeFilm();
    mockAPI
      .onGet(`${APIRoute.Films}/${mockFilm.id.toString()}/similar`)
      .reply(200, [mockFilm]);

    const store = mockStore();

    await store.dispatch(fetchSimilarFilmsAction(mockFilm.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchSimilarFilmsAction.pending.type,
      fetchSimilarFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchPromoAction after route /', async () => {
    const mockFilm = makeFakeFilm();
    mockAPI
      .onGet(APIRoute.Promo)
      .reply(200, mockFilm);

    const store = mockStore();

    await store.dispatch(fetchPromoAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchPromoAction.pending.type,
      fetchPromoAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction after route review comments', async () => {
    const mockFilm = makeFakeFilm();
    const mockReviews = makeFakeReviews(12);
    mockAPI
      .onGet(`${APIRoute.Comments}/${mockFilm.id.toString()}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(mockFilm.id.toString()));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch postNewReviewAction after add new comment', async () => {
    const mockFilm = makeFakeFilm();
    const mockNewComment = makeNewComment(mockFilm.id);
    mockAPI
      .onPost(`${APIRoute.Comments}/${mockFilm.id.toString()}`)
      .reply(200, mockNewComment);

    const store = mockStore();

    await store.dispatch(postNewReviewAction(mockNewComment));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postNewReviewAction.pending.type,
      redirectToBack.type,
      postNewReviewAction.fulfilled.type
    ]);
  });

  it('should dispatch postFavoriteFilmAction after add new favorite film', async () => {
    const mockFavoriteFilm = {...makeFakeFilm(), isFavorite: true} as Film;
    const favoriteFilmInclude = {id: mockFavoriteFilm.id, status: 1} as FavoriteFilm;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockFavoriteFilm.id}/1`)
      .reply(200, mockFavoriteFilm);

    const store = mockStore();

    await store.dispatch(postFavoriteFilmAction(favoriteFilmInclude));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFavoriteFilmAction.pending.type,
      postFavoriteFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch postFavoriteFilmAction after delete one favorite film', async () => {
    const mockNotFavoriteFilm = {...makeFakeFilm(), isFavorite: false} as Film;
    const favoriteFilmExclude = {id: mockNotFavoriteFilm.id, status: 0} as FavoriteFilm;
    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockNotFavoriteFilm.id}/0`)
      .reply(200, mockNotFavoriteFilm);

    const store = mockStore();

    await store.dispatch(postFavoriteFilmAction(favoriteFilmExclude));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      postFavoriteFilmAction.pending.type,
      postFavoriteFilmAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoriteFilmsAction after myList route', async () => {
    const mockFilms = makeFakeInitialFilms(5);
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockFilms);

    const store = mockStore();

    await store.dispatch(fetchFavoriteFilmsAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteFilmsAction.pending.type,
      fetchFavoriteFilmsAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {email: 'test@test.ru', password: '123456'};

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});

    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      fetchFavoriteFilmsAction.pending.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('films-token', 'secret');
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);
    expect(store.getActions()).toEqual([]);
    await store.dispatch(checkAuthAction());
    const actions = store.getActions().map(({type}) => type);
    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);
  });
});
