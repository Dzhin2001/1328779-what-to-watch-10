import {Films} from '../../types/films';
import FilmCard from '../film-card/film-card';

type FilmListProps = {
  films: Films,
};

function FilmList({films}: FilmListProps): JSX.Element {
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
          <FilmCard
            key={film.id}
            film={film}
          />
        ))
      }
    </div>
  );
}

export default FilmList;
