import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import FilmDetails from './film-details';

const mockFilm = makeFakeFilm(11);

const mockStore = configureMockStore<State, AnyAction>();
const store = mockStore();

describe('Component: FilmDetails', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmDetails film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Director')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.director)).toBeInTheDocument();
    expect(screen.getByText('Starring')).toBeInTheDocument();
    expect(screen.getByText('Genre')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.genre)).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText(mockFilm.released.toString())).toBeInTheDocument();
  });
});
