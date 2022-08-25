import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';
import {AuthorizationStatus} from '../../const';
import {FavoriteFilm} from '../../types/films';
import {fetchFavoriteFilmsAction, postFavoriteFilmAction} from '../../store/api-actions';
import {useEffect} from 'react';

function ButtonList(): JSX.Element {
  const dispatch = useAppDispatch();
  const {film, favoriteFilms, authorizationStatus} = useAppSelector((state) => state);
  const isFavorite = film ? film.isFavorite : false;

  useEffect(() => {
    dispatch(fetchFavoriteFilmsAction());
  }, [isFavorite]);

  const onClickBtn = (favoriteStatus: FavoriteFilm) => {
    dispatch(postFavoriteFilmAction(favoriteStatus));
  };

  const handleClickBtn = () => {
    if (authorizationStatus !== AuthorizationStatus.Auth) {
      dispatch(redirectToRoute('login'));
      return;
    }
    if (film) {
      onClickBtn({
        id: film.id,
        status: isFavorite ? 0 : 1,
      });
    }
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
