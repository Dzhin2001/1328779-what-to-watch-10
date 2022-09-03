import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {makeFakeFilm} from '../../utils/mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import FilmTabs from './film-tabs';

const mockFilm = makeFakeFilm(111);

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore({});

describe('Component: FilmTabs', () => {

  it('should render correctly', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmTabs
            film={mockFilm}
          />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText('Overview')).toBeInTheDocument();
    expect(screen.getByText('Details')).toBeInTheDocument();
    expect(screen.getByText('Reviews')).toBeInTheDocument();

  });
});
