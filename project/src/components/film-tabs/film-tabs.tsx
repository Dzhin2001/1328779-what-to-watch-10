import { Film } from '../../types/films';
import FilmOverview from '../../components/film-overview/film-overview';
import FilmDetails from '../../components/film-details/film-details';
import FilmReviews from '../../components/film-reviews/film-reviews';
import {useState} from 'react';

type FilmTabsProps = {
  film: Film,
};

function FilmTabs({film}: FilmTabsProps): JSX.Element {
  const [activeTab, setActiveTab] = useState('overview');
  const getComponentByType = () => {
    switch(activeTab) {
      case 'default':
      case 'overview':
        return <FilmOverview film={film} />;
      case 'details':
        return <FilmDetails film={film} />;
      case 'reviews':
        return <FilmReviews id={film.id.toString()} />;
    }
  };
  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          <li className={`film-nav__item ${activeTab === 'overview' ? 'film-nav__item--active' : ''}`}>
            <a className="film-nav__link" onClick={()=>setActiveTab('overview')}>Overview</a>
          </li>
          <li className={`film-nav__item ${activeTab === 'details' ? 'film-nav__item--active' : ''}`}>
            <a className="film-nav__link" onClick={()=>setActiveTab('details')}>Details</a>
          </li>
          <li className={`film-nav__item ${activeTab === 'reviews' ? 'film-nav__item--active' : ''}`}>
            <a className="film-nav__link" onClick={()=>setActiveTab('reviews')}>Reviews</a>
          </li>
        </ul>
      </nav>
      <div>
        {getComponentByType()}
      </div>
    </div>
  );
}

export default FilmTabs;
