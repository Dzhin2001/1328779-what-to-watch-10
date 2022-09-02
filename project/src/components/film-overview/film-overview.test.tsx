import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mocks';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import FilmOverview from './film-overview';

const mockFilm = makeFakeFilm(11);

const mockStore = configureMockStore<State, AnyAction>();
const store = mockStore();

describe('Component: FilmOverview', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmOverview film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.rating)).toBeInTheDocument();
    expect(screen.getByText(`${mockFilm.scoresCount} ratings`)).toBeInTheDocument();
    expect(screen.getByText(`Director: ${mockFilm.director}`)).toBeInTheDocument();
    expect(screen.getByText(mockFilm.description)).toBeInTheDocument();
  });
});
