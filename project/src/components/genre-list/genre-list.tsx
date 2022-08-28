import FilmList from '../../components/film-list/film-list';
import {useState} from 'react';
import {DEFAULT_FILM_COUNT, DEFAULT_GENRE} from '../../const';
import {getGenres, getFilteredFilms} from '../../utils/films';
import {Films} from '../../types/films';
import {memo} from 'react';

type GenreListProps = {
  films: Films,
};

function GenreList({films}:GenreListProps): JSX.Element {
  const [filteredFilms, setFilteredFilms] = useState(films);
  const getFilmsCount = (newCount: number) => (newCount < filteredFilms.length ? newCount : filteredFilms.length);
  const [actualGenre, setActualGenre] = useState(DEFAULT_GENRE);
  const [filmsCount, setFilmsCount] = useState( getFilmsCount(DEFAULT_FILM_COUNT ) );
  const genres = getGenres(films);

  return (
    <>
      <ul className="catalog__genres-list">
        {genres.map((genre) => (
          <li key={genre} className={`catalog__genres-item ${genre === actualGenre ? 'catalog__genres-item--active' : ''}`}>
            <a className="catalog__genres-link"
              onClick={(evt) => {
                evt.preventDefault();
                setActualGenre(genre);
                setFilteredFilms(getFilteredFilms(films, genre));
              }}
            >
              {genre}
            </a>
          </li>
        ))}
      </ul>

      <FilmList
        films={filteredFilms}
        filmsCount={filmsCount}
      />

      {
        filmsCount < filteredFilms.length &&
        <div className="catalog__more">
          <button
            className="catalog__button"
            type="button"
            onClick={() => {
              setFilmsCount(getFilmsCount(filmsCount + DEFAULT_FILM_COUNT ));
            }}
          >Show more
          </button>
        </div>
      }

    </>
  );
}

export default memo(GenreList);
