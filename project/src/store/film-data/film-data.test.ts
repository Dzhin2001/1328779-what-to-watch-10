import {filmData} from './film-data';
import {fetchFilmsAction, fetchFilmAction, fetchSimilarFilmsAction, fetchPromoAction} from '../api-actions';
import {makeFakeFilm, makeFakeInitialFilms} from '../../utils/mocks';
import {FilmData} from '../../types/state';

const mockFilm = makeFakeFilm(0);
const mockInitialFilms = makeFakeInitialFilms(9);

describe('Reducer: filmData', () => {
  let state: FilmData;

  beforeEach(() => {
    state = {
      initialFilms: [],
      promoFilm: null,
      film: null,
      similarFilms: [],
      isDataLoaded: false,
    };
  });

  it('without additional parameters should return initial state', () => {
    expect(filmData.reducer(void 0, {type: 'UNKNOWN_ACTION'}))
      .toEqual(state);
  });

  describe('fetchFilmsAction test', () => {
    it('should pending to set flag isDataLoading', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.pending.type, payload: mockInitialFilms}))
        .toEqual({
          ...state,
          isDataLoaded: true,
        });
    });
    it('should update initialFilms by load films', () => {
      expect(filmData.reducer(state, {type: fetchFilmsAction.fulfilled.type, payload: mockInitialFilms}))
        .toEqual({
          ...state,
          initialFilms: mockInitialFilms,
          isDataLoaded: false
        });
    });
    it('should rejected to load films', () => {
      expect(filmData.reducer(state, {type: fetchFilmsAction.rejected.type, payload: mockInitialFilms}))
        .toEqual(state);
    });
  });

  describe('fetchFilmAction test', () => {
    it('should pending to blocked form', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.pending.type, payload: mockFilm}))
        .toEqual({
          ...state,
          isDataLoaded: true,
        });
    });
    it('should update the film by load', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.fulfilled.type, payload: mockFilm}))
        .toEqual({
          ...state,
          film: mockFilm,
        });
    });
    it('should rejected to load film', () => {
      expect(filmData.reducer(state, {type: fetchFilmAction.rejected.type, payload: mockFilm}))
        .toEqual(state);
    });
  });

  describe('fetchSimilarFilmsAction test', () => {
    it('should pending to set flag isDataLoading', () => {
      expect(filmData.reducer(state, {type: fetchSimilarFilmsAction.pending.type, payload: mockInitialFilms}))
        .toEqual({
          ...state,
          isDataLoaded: true,
        });
    });
    it('should update similarFilms by load films', () => {
      expect(filmData.reducer(state, {type: fetchSimilarFilmsAction.fulfilled.type, payload: mockInitialFilms}))
        .toEqual({
          ...state,
          similarFilms: mockInitialFilms,
          isDataLoaded: false
        });
    });
    it('should rejected to load films', () => {
      expect(filmData.reducer(state, {type: fetchSimilarFilmsAction.rejected.type, payload: mockInitialFilms}))
        .toEqual(state);
    });
  });

  describe('fetchPromoAction test', () => {
    it('should pending to blocked form', () => {
      expect(filmData.reducer(state, {type: fetchPromoAction.pending.type, payload: mockFilm}))
        .toEqual({
          ...state,
          isDataLoaded: true,
        });
    });
    it('should update the promoFilm by load', () => {
      expect(filmData.reducer(state, {type: fetchPromoAction.fulfilled.type, payload: mockFilm}))
        .toEqual({
          ...state,
          promoFilm: mockFilm,
        });
    });
    it('should rejected to load film', () => {
      expect(filmData.reducer(state, {type: fetchPromoAction.rejected.type, payload: mockFilm}))
        .toEqual(state);
    });
  });
});
