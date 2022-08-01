import Logo from '../../components/logo/logo';
import {Films} from '../../types/films';
import {Link, useParams} from 'react-router-dom';
import NotFoundScreen from '../../components/error-404/not-found-screen';
import NewReview from '../../components/new-review/new-review';

type AddReviewProps = {
  films: Films,
};

function AddReview({films}: AddReviewProps): JSX.Element {
  const { id } = useParams();
  const film = films.find((element) => element.id.toString() === id);
  if (film) {
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

            <ul className="user-block">
              <li className="user-block__item">
                <div className="user-block__avatar">
                  <img src="img/avatar.jpg" alt="User avatar" width="63" height="63"/>
                </div>
              </li>
              <li className="user-block__item">
                <a className="user-block__link">Sign out</a>
              </li>
            </ul>
          </header>

          <div className="film-card__poster film-card__poster--small">
            <img src={film.posterImage} alt={film.name} width="218" height="327"/>
          </div>
        </div>

        <NewReview />

      </section>
    );
  } else {
    return <NotFoundScreen />;
  }
}

export default AddReview;
