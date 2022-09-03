import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeInitialFilms} from '../../utils/mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import FilmList from './film-list';

const TEST_FILM_COUNT = 11;
const mockFilms = makeFakeInitialFilms(TEST_FILM_COUNT);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore({});

describe('Component: FilmList', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmList
            films={mockFilms}
            filmsCount={2}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilms[0].name)).toBeInTheDocument();
    expect(screen.getByText(mockFilms[1].name)).toBeInTheDocument();


  });
});
