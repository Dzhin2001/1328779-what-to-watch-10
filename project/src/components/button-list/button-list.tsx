import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import {AppRoute, AuthorizationStatus} from '../../const';
import {FavoriteFilm} from '../../types/films';
import {useEffect, useState} from 'react';
import {postFavoriteFilmAction} from '../../store/api-actions';
import {getAuthorizationStatus, getFavoriteFilms} from '../../store/user-process/selectors';

type ButtonListProps = {
  idFilm: number,
};

function ButtonList({idFilm}: ButtonListProps): JSX.Element {
  const dispatch = useAppDispatch();
  const favoriteFilms = useAppSelector(getFavoriteFilms);
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const findFavoriteFilmById = (id: number): boolean => (favoriteFilms.find( (element) => element.id === id ) !== undefined);
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    setIsFavorite(findFavoriteFilmById(idFilm));
  }, [favoriteFilms.length]);

  const onClickListBtn = (favoriteStatus: FavoriteFilm) => {
    dispatch(postFavoriteFilmAction(favoriteStatus));
  };

  const handleClickBtn = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute(AppRoute.SignIn));
      return;
    }
    setIsFavorite(!isFavorite);
    onClickListBtn({
      id: idFilm,
      status: isFavorite ? 1 : 0,
    });
  };

  return (
    <button
      className="btn btn--list film-card__button"
      type="button"
      onClick={handleClickBtn}
    >
      <svg viewBox="0 0 19 20" width="19" height="20">
        <use xlinkHref={`${isFavorite && authorizationStatus === AuthorizationStatus.Auth ? '#in-list' : '#add' }`}></use>
      </svg>
      <span>My list</span>
      <span className="film-card__count">{favoriteFilms.length}</span>
    </button>
  );
}

export default ButtonList;
