import { Rating, Actors, Film } from '../../types/films';

type FilmOverviewProps = {
  film: Film,
};

const getActors = (actors: Actors) => (actors.join(', '));

const getRating = (rating: Rating) => {
  if (rating < 3) {
    return 'Bad';
  } else if (rating < 5) {
    return 'Normal';
  } else if (rating < 8) {
    return 'Good';
  } else if (rating < 10) {
    return 'Very good';
  } else {
    return 'Awesome';
  }
};

function FilmOverview({film}: FilmOverviewProps): JSX.Element {
  return (
    <>
      <div className="film-rating">
        <div className="film-rating__score">{film.rating} </div>
        <p className="film-rating__meta">
          <span className="film-rating__level">{getRating(film.rating)}</span>
          <span className="film-rating__count">{film.scoresCount} ratings</span>
        </p>
      </div>

      <div className="film-card__text">
        <p>
          {film.description}
        </p>

        <p className="film-card__director"><strong>Director: {film.director} </strong></p>

        <p className="film-card__starring">
          <strong>
            {`Starring: ${getActors(film.starring)}`}
            <br />
            {'and other'}
          </strong>
        </p>
      </div>
    </>
  );
}

export default FilmOverview;
