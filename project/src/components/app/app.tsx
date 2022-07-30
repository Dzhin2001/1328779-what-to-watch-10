import {Route, BrowserRouter, Routes} from 'react-router-dom';
import {AppRoute, AuthorizationStatus} from '../../const';
import Main from '../../pages/main/main';
import SignIn from '../../pages/sign-in/sign-in';
import MyList from '../../pages/my-list/my-list';
import MoviePage from '../../pages/movie-page/movie-page';
import AddReview from '../../pages/add-review/add-review';
import Player from '../../pages/player/player';
import NotFoundScreen from '../error-404/not-found-screen';
import PrivateRoute from '../private-route/private-route';
import {Films} from '../../types/films';
import {Reviews} from '../../types/reviews';

type AppScreenProps = {
  films: Films,
  reviews: Reviews,
  filmDetails: {
    name: string,
    genre: string,
    year: number,
  }
};

function App({films, reviews, filmDetails}:AppScreenProps ): JSX.Element {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={AppRoute.Main}
          element={
            <Main
              films={films}
              filmDetails={filmDetails}
            />
          }
        />
        <Route
          path={AppRoute.SignIn}
          element={<SignIn />}
        />
        <Route
          path={AppRoute.MyList}
          element={
            <PrivateRoute
              authorizationStatus={AuthorizationStatus.NoAuth}
            >
              <MyList
                films={films}
              />
            </PrivateRoute>
          }
        />
        <Route
          path={AppRoute.Film}
          element={
            <MoviePage
              films={films}
              reviews={reviews}
            />
          }
        />
        <Route
          path={AppRoute.AddReview}
          element={
            <AddReview
              films={films}
            />
          }
        />
        <Route
          path={AppRoute.Player}
          element={
            <Player
              films={films}
            />
          }
        />
        <Route
          path="*"
          element={<NotFoundScreen />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
