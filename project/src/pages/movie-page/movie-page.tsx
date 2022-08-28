import { useParams } from 'react-router-dom';
import LoadingScreen from '../loading-screen/loading-screen';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import FilmTabs from '../../components/film-tabs/film-tabs';
import FilmList from '../../components/film-list/film-list';
import ButtonPlay from '../../components/button-play/button-play';
import {DEFAULT_LIKED_FILM_COUNT, AuthorizationStatus} from '../../const';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {fetchFilmAction, fetchSimilarFilmsAction} from '../../store/api-actions';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import ButtonList from '../../components/button-list/button-list';
import {getAuthorizationStatus} from '../../store/user-process/selectors';
import {getFilm, getSimilarFilms} from '../../store/film-data/selectors';

function MoviePage(): JSX.Element {
  const film = useAppSelector(getFilm);
  const similarFilms = useAppSelector(getSimilarFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const { id } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchFilmAction(id));
      dispatch(fetchSimilarFilmsAction(id));
    }
  }, [id]);

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
              <UserBlock />
            </header>

            <div className="film-card__wrap">
              <div className="film-card__desc">
                <h2 className="film-card__title">{film.name}</h2>
                <p className="film-card__meta">
                  <span className="film-card__genre">{film.genre}</span>
                  <span className="film-card__year">{film.released}</span>
                </p>

                <div className="film-card__buttons">

                  <ButtonPlay />

                  <ButtonList />

                  {
                    authorizationStatus === AuthorizationStatus.Auth &&
                    <Link to={'review'} className="btn film-card__button">Add review</Link>
                  }

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
              />

            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog catalog--like-this">
            <h2 className="catalog__title">More like this</h2>

            <FilmList
              films={ similarFilms }
              filmsCount={DEFAULT_LIKED_FILM_COUNT}
            />

          </section>

          <Footer />

        </div>
      </>
    );
  } else {
    return <LoadingScreen />;
  }
}

export default MoviePage;
