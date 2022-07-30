import { Actors, Film } from '../../types/films';
import React from 'react';

type FilmDetailsProps = {
  film: Film,
};


const getActors = (actors: Actors) => (actors.join('\n'));

const getTime = (time: number) => {
  const hours = Math.floor(time / 60);
  const minutes = time % 60;
  return (hours === 0 ? `${minutes}m` : `${hours}h ${minutes}m`);
};

function FilmDetails({film}: FilmDetailsProps): JSX.Element {
  return (

    <div className="film-card__text film-card__row">
      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Director</strong>
          <span className="film-card__details-value">{film.director}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Starring</strong>
          <span className="film-card__details-value">{getActors(film.starring)}</span>
        </p>
      </div>

      <div className="film-card__text-col">
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Run Time</strong>
          <span className="film-card__details-value">{getTime(film.runTime)}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Genre</strong>
          <span className="film-card__details-value">{film.genre}</span>
        </p>
        <p className="film-card__details-item">
          <strong className="film-card__details-name">Released</strong>
          <span className="film-card__details-value">{film.released}</span>
        </p>
      </div>
    </div>

  );
}

export default FilmDetails;
