import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {AuthorizationStatus, AppRoute, NameSpace} from '../../const';
import App from './app';
import {makeFakeInitialFilms} from '../../utils/mocks';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {State} from '../../types/state';
import {AnyAction} from 'redux';

const TEST_FILM_COUNT = 11;
const mockFilms = makeFakeInitialFilms(TEST_FILM_COUNT);
const mockFilm = mockFilms[0];

const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userData: null,
    favoriteFilms: [],
  },
  [NameSpace.Film]: {
    initialFilms: mockFilms,
    promoFilm: mockFilm,
    film: mockFilm,
    similarFilms: [],
    isDataLoaded: false,
  },
  [NameSpace.Review]: {
    reviews: [],
    isFormBlocked: false,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();

const fakeApp = (
  <Provider store={store}>
    <App />
  </Provider>
);

describe('Application Routing', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render "Main screen" when user navigate to "/"', () => {
    history.push(AppRoute.Main);

    render(fakeApp);

    expect(screen.getByText('WTW')).toBeInTheDocument();

  });

  it('should render "AuthScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.SignIn);

    render(fakeApp);

    expect(screen.getByText('WTW')).toBeInTheDocument();

  });

});
