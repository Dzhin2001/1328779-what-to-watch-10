import FilmList from '../../components/film-list/film-list';
import GenreList from '../../components/genre-list/genre-list';
import Logo from '../../components/logo/logo';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import NotFoundScreen from '../../components/error-404/not-found-screen';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {DEFAULT_FILM_COUNT} from '../../const';
import {setPromoFilm} from '../../store/action';
import {useState} from 'react';

function Main(): JSX.Element {
  const {promoFilm, filteredFilms} = useAppSelector((state) => state);
  const getFilmsCount = (newCount: number) => (newCount < filteredFilms.length ? newCount : filteredFilms.length);
  const [filmsCount, setFilmsCount] = useState( DEFAULT_FILM_COUNT );
  const dispatch = useAppDispatch();
  const showMoreBtnClickHandle = () => {
    setFilmsCount(getFilmsCount(filmsCount + DEFAULT_FILM_COUNT ));
  };

  dispatch(setPromoFilm());

  if (promoFilm) {
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
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="page-content">
          <section className="catalog">
            <h2 className="catalog__title visually-hidden">Catalog</h2>

            <GenreList/>

            <FilmList
              films={filteredFilms}
              filmsCount={getFilmsCount(filmsCount)}
            />

            {
              filmsCount < filteredFilms.length &&
              <div className="catalog__more">
                <button className="catalog__button" type="button" onClick={showMoreBtnClickHandle}>Show more</button>
              </div>
            }
          </section>

          <Footer />

        </div>
      </>
    );
  } else {
    return <NotFoundScreen />;
  }
}

export default Main;
