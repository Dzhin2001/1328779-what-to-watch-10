import {Films} from '../../types/films';
import FilmCard from '../film-card/film-card';
import {useState} from 'react';

type FilmListProps = {
  films: Films,
  filmsCount: number,
};

function FilmList({films, filmsCount}: FilmListProps): JSX.Element {
  const [ , setActiveCard] = useState(-1);

  return (
    <div className="catalog__films-list">
      {
        films.slice(0,filmsCount).map((film) => (
          <FilmCard
            key={ film.id }
            film={ film }
            setActiveCard={ setActiveCard }
          />
        ))
      }
    </div>
  );
}

export default FilmList;
