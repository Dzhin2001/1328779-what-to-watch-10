import {useAppDispatch} from '../../hooks';
import {redirectToRoute} from '../../store/action';

type ButtonPlayProps = {
  idFilm: number,
};

function ButtonPlay({idFilm}: ButtonPlayProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={ () => {
        dispatch(redirectToRoute(`player/${idFilm}`));
      }}
    >
      <svg viewBox="0 0 19 19" width="19" height="19">
        <use xlinkHref="#play-s"></use>
      </svg>
      <span>Play</span>
    </button>
  );
}

export default ButtonPlay;
