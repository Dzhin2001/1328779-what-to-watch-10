import {useAppDispatch, useAppSelector} from '../../hooks';
import {redirectToRoute} from '../../store/action';

function ButtonPlay(): JSX.Element {
  const dispatch = useAppDispatch();
  const {film} = useAppSelector((state) => state);

  return (
    <button
      className="btn btn--play film-card__button"
      type="button"
      onClick={ () => {
        if (film) {
          dispatch(redirectToRoute(`player/${film.id}`));
        }
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
