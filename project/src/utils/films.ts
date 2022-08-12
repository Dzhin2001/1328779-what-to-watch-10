import {DEFAULT_GENRE} from '../const';
import {Films, Film} from '../types/films';

const getGenres = (films: Films) => (
  Array.from(
    new Set([
      DEFAULT_GENRE,
      ...films.map((e: Film) => (e.genre))
    ])
  )
);

export {getGenres};
