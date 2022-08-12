import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {changeGenre, filterFilms} from '../../store/action';

function GenreList(): JSX.Element {
  const {actualGenre, genres} = useAppSelector((state) => state);
  const dispatch = useAppDispatch();
  return (
    <ul className="catalog__genres-list">
      {genres.map((genre) => (
        <li key={genre} className={`catalog__genres-item ${genre === actualGenre ? 'catalog__genres-item--active' : ''}`}>
          <Link to="/" className="catalog__genres-link"
            onClick={() => {
              dispatch(changeGenre(genre));
              dispatch(filterFilms());
            }}
          >
            {genre}
          </Link>
        </li>
      ))}
    </ul>
  );
}

export default GenreList;
