import {Films} from '../../types/films';
import FilmCard from '../film-card/film-card';
import {useState} from "react";

type FilmListProps = {
  films: Films,
};

function FilmList({films}: FilmListProps): JSX.Element {
  const [,setActiveCard] = useState(0);
  return (
    <div className="catalog__films-list">
      {
        films.map((film) => (
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
