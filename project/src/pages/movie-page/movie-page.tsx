import {Reviews} from '../../types/reviews';
import { useParams } from 'react-router-dom';
import NotFoundScreen from '../../components/error-404/not-found-screen';
import Logo from '../../components/logo/logo';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmList from '../../components/film-list/film-list';
import {getSimilarFilms} from '../../utils/films';
import {DEFAULT_LIKED_FILM_COUNT} from '../../const';
import {useAppSelector} from '../../hooks';

type MoviePageProps = {
  reviews: Reviews,
};

function MoviePage({reviews}: MoviePageProps): JSX.Element {
  const {initialFilms} = useAppSelector((state) => state);
  const { id } = useParams();
  const film = initialFilms.find((element) => element.id.toString() === id);
  if (film) {
    return (
      <>
        <section className="film-card film-card--full">
          <div className="film-card__hero">
            <div className="film-card__bg">
              <img src={film.backgroundImage} alt={film.name}/>
            </div>

            <h1 className="visually-hidden">WTW</h1>

            <header className="page-header film-card__head">
              <Logo />

              <ul className="user-block">
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                  </div>
                </li>
                <li className="user-block__item">
                  <a className="user-block__link">Sign out</a>
                </li>
              </ul>
            </header>

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">
                  <button className="btn btn--play film-card__button" type="button">
                    <svg viewBox="0 0 19 19" width="19" height="19">
                      <use xlinkHref="#play-s"></use>
                    </svg>
                    <span>Play</span>
                  </button>
                  <button className="btn btn--list film-card__button" type="button">
                    <svg viewBox="0 0 19 20" width="19" height="20">
                      <use xlinkHref="#add"></use>
                    </svg>
                    <span>My list</span>
                    <span className="film-card__count">9</span>
                  </button>
                  <a href="add-review.html" className="btn film-card__button">Add review</a>
                </div>
              </div>
            </div>
          </div>

          <div className="film-card__wrap film-card__translate-top">
            <div className="film-card__info">
              <div className="film-card__poster film-card__poster--big">
                <img src={film.posterImage} alt={film.name} width="218" height="327"/>
              </div>

              <FilmTabs
                film={film}
                reviews={reviews}
              />

            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmList
              films={ getSimilarFilms(initialFilms, film) }
              filmsCount={DEFAULT_LIKED_FILM_COUNT}
            />

          </section>

          <footer className="page-footer">
            <div className="logo">
              <a href="main.html" className="logo__link logo__link--light">
                <span className="logo__letter logo__letter--1">W</span>
                <span className="logo__letter logo__letter--2">T</span>
                <span className="logo__letter logo__letter--3">W</span>
              </a>
            </div>

            <div className="copyright">
              <p>© 2019 What to watch Ltd.</p>
            </div>
          </footer>
        </div>
      </>
    );
  } else {
    return <NotFoundScreen />;
  }
}

export default MoviePage;
