import {Film} from '../../types/films';
import {useState} from 'react';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film,
  setActiveCard: Function,
};

function FilmCard({film, setActiveCard}: FilmCardProps): JSX.Element {
  const id = film.id;
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter ={(e) => {
        setActiveCard(film.id);
      }}
      onMouseLeave ={(e) => {
        setActiveCard(0);
      }}
    >
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id.toString()}`} className="small-film-card__link">{film.name} </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
