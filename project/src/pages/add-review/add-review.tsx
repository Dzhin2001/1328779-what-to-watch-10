import Logo from '../../components/logo/logo';
import LoadingScreen from '../loading-screen/loading-screen';
import NewReview from '../../components/new-review/new-review';
import UserBlock from '../../components/user-block/user-block';
import {Link, useParams} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getInitialFilms} from '../../store/film-data/selectors';

function AddReview(): JSX.Element {
  const films = useAppSelector(getInitialFilms);
  const { id } = useParams();
  const film = films.find((element) => element.id.toString() === id);

  if (!film) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>

        <h1 className="visually-hidden">WTW</h1>

        <header className="page-header">
          <Logo />

          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link to={`/films/${film.id.toString()}`} className="breadcrumbs__link">{film.name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a className="breadcrumbs__link">Add review</a>
              </li>
            </ul>
          </nav>

          <UserBlock />
        </header>

        <div className="film-card__poster film-card__poster--small">
          <img src={film.posterImage} alt={film.name} width="218" height="327"/>
        </div>
      </div>

      <NewReview film={film} />

    </section>
  );
}

export default AddReview;
