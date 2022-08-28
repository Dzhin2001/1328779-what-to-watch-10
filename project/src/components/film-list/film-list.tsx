import {Films} from '../../types/films';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films,
  filmsCount: number,
};

function FilmList({films, filmsCount}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.slice(0,filmsCount).map((film) => (
          <FilmCard
            key={ film.id }
            film={ film }
          />
        ))
      }
    </div>
  );
}

export default FilmList;
