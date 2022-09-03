import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeInitialFilms} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import Router from 'react-router-dom';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import Player from './player';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const TEST_FILM_COUNT = 11;
const mockFilms = makeFakeInitialFilms(TEST_FILM_COUNT);

const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: null,
    favoriteFilms: [],
  },
  [NameSpace.Film]: {
    initialFilms: mockFilms,
    promoFilm: mockFilms[0],
    film: mockFilms[0],
    similarFilms: mockFilms,
    isDataLoaded: false,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore(initialState);

describe('Component: Player', () => {
  const mockFilm = mockFilms[0];

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', async () => {
    const history = createMemoryHistory();
    history.push(`/films/${mockFilm.id}/player`);

    jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockFilm.id.toString() });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Player />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Exit')).toBeInTheDocument();
    expect(screen.getByText('Toggler')).toBeInTheDocument();
    expect(screen.getByText('Play')).toBeInTheDocument();
    expect(screen.getByText('Full screen')).toBeInTheDocument();
  });
});
