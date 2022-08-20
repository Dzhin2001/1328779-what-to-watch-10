import {DEFAULT_GENRE, AuthorizationStatus} from '../const';
import {Films, Film, Genre} from '../types/films';

const getGenres = (films: Films) => (
  Array.from(
    new Set([
      DEFAULT_GENRE,
      ...films.map((e: Film) => (e.genre))
    ])
  )
);

const getSimilarFilms = (films: Films, sampleFilm: Film) => (
  films.filter((e) => e.genre === sampleFilm.genre)
);

const getFiltredFilms = (films: Films, genre: Genre) => {
  if (genre !== 'All genres') {
    return films.filter((e) => e.genre === genre);
  }
  return films;
};

const isCheckedAuth = (authorizationStatus: AuthorizationStatus): boolean =>
  authorizationStatus === AuthorizationStatus.Unknown;

export {getGenres, getSimilarFilms, getFiltredFilms, isCheckedAuth};
