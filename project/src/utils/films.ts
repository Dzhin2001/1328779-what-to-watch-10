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

const getSimilarFilms = (films: Films, sampleFilm: Film) => (
  films.filter((e) => e.genre === sampleFilm.genre)
);

export {getGenres, getSimilarFilms};
