import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import {films} from './mocks/films';
import {reviews} from './mocks/reviews';

const FilmDetails = {
  name: 'The Grand Gorki Gorod Hotel',
  genre: 'Drama',
  year: 2013,
};

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement,
);

root.render(
  <React.StrictMode>
    <App
      films={films}
      reviews={reviews}
      filmDetails={FilmDetails}
    />
  </React.StrictMode>,
);
