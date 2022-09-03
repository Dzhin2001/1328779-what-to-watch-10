import {userProcess} from './user-process';
import {UserProcess} from '../../types/state';
import {AuthorizationStatus} from '../../const';
import {
  checkAuthAction,
  fetchFavoriteFilmsAction,
  loginAction,
  logoutAction,
  postFavoriteFilmAction
} from '../api-actions';
import {makeFakeUserData, makeFakeFilm} from '../../utils/mocks';

const mockUserData = makeFakeUserData();
const mockFilm = makeFakeFilm(0);

describe('Reducer: userProcess', () => {
  let state: UserProcess;

  beforeEach(() => {
    state = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
      favoriteFilms: [],
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(userProcess.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual({
        authorizationStatus: AuthorizationStatus.Unknown,
        userData: null,
        favoriteFilms: [],
      });
  });

  describe('checkAuthAction test', () => {
    it('should update authorizationStatus to "AUTH" if checkAuthAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.fulfilled.type , payload: mockUserData }))
        .toEqual({...state, userData: mockUserData, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if checkAuthAction rejected', () => {
      expect(userProcess.reducer(state, { type: checkAuthAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          favoriteFilms: [],
        });
    });
  });

  describe('loginAction test', () => {
    it('should update authorizawtionStatus to "AUTH" if loginAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: loginAction.fulfilled.type, payload: mockUserData}))
        .toEqual({...state, userData: mockUserData, authorizationStatus: AuthorizationStatus.Auth});
    });
    it('should update authorizationStatus to "NO_AUTH" if loginAction rejected', () => {
      expect(userProcess.reducer(state, { type: loginAction.rejected.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          favoriteFilms: [],
        });
    });
  });

  describe('logoutAction test', () => {
    it('should update authorizationStatus to "NO_AUTH" if logoutAction fulfilled', () => {
      expect(userProcess.reducer(state, { type: logoutAction.fulfilled.type }))
        .toEqual({
          authorizationStatus: AuthorizationStatus.NoAuth,
          userData: null,
          favoriteFilms: [],
        });
    });
  });

  describe('fetchFavoriteFilmsAction test', () => {
    const mockFavoriteFilms = [mockFilm];

    it('should update favorite list', () => {
      expect(userProcess.reducer(state, { type: fetchFavoriteFilmsAction.fulfilled.type, payload: mockFavoriteFilms }))
        .toEqual({...state, favoriteFilms: mockFavoriteFilms });
    });
  });

  describe('postFavoriteFilmAction test', () => {
    const mockFilmIsFavoriteFalse = {...mockFilm, isFavorite: false};
    const mockFilmIsFavoriteTrue = {...mockFilm, isFavorite: true};

    it('should delete exists favorite film', () => {
      expect(userProcess.reducer(
        {...state, favoriteFilms: [mockFilmIsFavoriteTrue] },
        {type: postFavoriteFilmAction.fulfilled.type, payload: mockFilmIsFavoriteTrue }
      ))
        .toEqual({...state, favoriteFilms: [],});
    });
    it('should add film to favorite list', () => {
      expect(userProcess.reducer(state, {
        type: postFavoriteFilmAction.fulfilled.type,
        payload: mockFilmIsFavoriteFalse
      }))
        .toEqual({...state, favoriteFilms: [mockFilmIsFavoriteFalse] });
    });
  });
});
