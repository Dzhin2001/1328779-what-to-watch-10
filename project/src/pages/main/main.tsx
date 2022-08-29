import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import LoadingScreen from '../loading-screen/loading-screen';
import ButtonPlay from '../../components/button-play/button-play';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect} from 'react';
import {fetchPromoAction} from '../../store/api-actions';
import ButtonAddFavorite from '../../components/button-add-favorite/button-add-favorite';
import GenreList from '../../components/genre-list/genre-list';
import {getPromoFilm, getInitialFilms, getLoadedFilmStatus} from '../../store/film-data/selectors';

function Main(): JSX.Element {
  const isDataLoaded = useAppSelector(getLoadedFilmStatus);
  const promoFilm = useAppSelector(getPromoFilm);
  const initialFilms = useAppSelector(getInitialFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchPromoAction());
  }, []);

  if (isDataLoaded || !promoFilm) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <>
      <section className="film-card">
        <div className="film-card__bg">
          <img src={promoFilm.backgroundImage} alt={promoFilm.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header film-card__head">
          <Logo/>
          <UserBlock/>
        </header>

        <div className="film-card__wrap">
          <div className="film-card__info">
            <div className="film-card__poster">
              <img src={promoFilm.posterImage} alt={promoFilm.name} width="218" height="327"/>
            </div>

            <div className="film-card__desc">
              <h2 className="film-card__title">{promoFilm.name}</h2>
              <p className="film-card__meta">
                <span className="film-card__genre">{promoFilm.genre}</span>
                <span className="film-card__year">{promoFilm.released}</span>
              </p>

              <div className="film-card__buttons">

                <ButtonPlay idFilm={promoFilm.id} />

                <ButtonAddFavorite idFilm={promoFilm.id} />

              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="page-content">
        <section className="catalog">
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList
            films={initialFilms}
          />

        </section>

        <Footer />

      </div>
    </>
  );
}

export default Main;
