import {isCheckedAuth, getGenres, getFilteredFilms} from './films';
import {makeFakeFilm, makeFakeInitialFilms} from './mocks';
import {AuthorizationStatus, DEFAULT_GENRE} from '../const';

const mockFilm = makeFakeFilm(0);
const mockFilms = makeFakeInitialFilms(9);

describe('Function: isCheckedAuth', () => {
  it('should return "true" when user is authorized', () => {
    expect(isCheckedAuth(AuthorizationStatus.Unknown))
      .toEqual(true);
  });
  it('should return "false" when user is unknown authorised', () => {
    expect(isCheckedAuth(AuthorizationStatus.Auth))
      .toEqual(false);
  });
  it('should return "false" when user is not authorized', () => {
    expect(isCheckedAuth(AuthorizationStatus.NoAuth))
      .toEqual(false);
  });
});

describe('Function: getGenres', () => {
  const genres = [DEFAULT_GENRE, mockFilm.genre];
  it('should return array of genres', () => {
    expect(getGenres([mockFilm]))
      .toEqual(genres);
  });
});

describe('Function: getFilteredFilms', () => {
  const genres = [DEFAULT_GENRE, mockFilm.genre];
  it('should return full array of films', () => {
    expect(getFilteredFilms(mockFilms, DEFAULT_GENRE))
      .toEqual(mockFilms);
  });
  it('should return filtered array of films', () => {
    expect(getFilteredFilms([mockFilm], genres[1]))
      .toEqual([mockFilm]);
  });
});
