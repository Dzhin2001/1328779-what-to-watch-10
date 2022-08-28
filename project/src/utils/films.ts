import {DEFAULT_GENRE, AuthorizationStatus} from '../const';
import {Films, Film, Genre} from '../types/films';

const getGenres = (films: Films): Genre[] => (
  Array.from(
    new Set([
      DEFAULT_GENRE,
      ...films.map((e: Film) => (e.genre))
    ])
  )
);

const getFilteredFilms = (films: Films, genre: Genre) : Films => {
  if (genre !== 'All genres') {
    return films.filter((e) => e.genre === genre);
  }
  return films;
};

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export {getGenres, getFilteredFilms, isCheckedAuth};
