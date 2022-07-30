import {Film} from '../../types/films';
import {useState} from 'react';
import {Link} from 'react-router-dom';

type FilmCardProps = {
  film: Film,
};

function FilmCard({film}: FilmCardProps): JSX.Element {
  const id = film.id.toString();
  const setActive = useState(false)[1];
  return (
    <article className="small-film-card catalog__films-card"
      onMouseEnter ={(e) => {
        setActive(true);
      }}
      onMouseLeave ={(e) => {
        setActive(false);
      }}
    >
      <div className="small-film-card__image">
        <img src={film.posterImage} alt={film.name} width="280" height="175"/>
      </div>
      <h3 className="small-film-card__title">
        <Link to={`/films/${id}`} className="small-film-card__link">{film.name} </Link>
      </h3>
    </article>
  );
}

export default FilmCard;
