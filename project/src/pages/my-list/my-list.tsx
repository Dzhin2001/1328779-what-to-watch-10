import Logo from '../../components/logo/logo';
import FilmList from '../../components/film-list/film-list';
import UserBlock from '../../components/user-block/user-block';
import Footer from '../../components/footer/footer';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {useEffect, useState} from 'react';
import {fetchFavoriteFilmsAction} from '../../store/api-actions';
import {getFavoriteFilms} from '../../store/user-process/selectors';


function MyList(): JSX.Element {
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const dispatch = useAppDispatch();

  useEffect(() => {
      dispatch(fetchFavoriteFilmsAction());
  }, []);

  return (
    <div className="user-page">
      <header className="page-header user-page__head">
        <Logo />

        <h1 className="page-title user-page__title">My list <span className="user-page__film-count">{favoriteFilms.length}</span></h1>

        <UserBlock />
      </header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>

        <FilmList
          films={favoriteFilms}
          filmsCount={favoriteFilms.length}
        />
      </section>

      <Footer />

    </div>
  );
}

export default MyList;
