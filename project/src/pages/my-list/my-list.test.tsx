import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeInitialFilms} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import MyList from './my-list';

const TEST_FILM_COUNT = 11;
const mockFilms = makeFakeInitialFilms(TEST_FILM_COUNT);

const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: null,
    favoriteFilms: mockFilms,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore(initialState);

describe('Component: MyList', () => {

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', async () => {
    const history = createMemoryHistory();
    history.push('/mylist');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <MyList />
        </HistoryRouter>
      </Provider>
    );
    expect(screen.getByText('My list')).toBeInTheDocument();
    expect(screen.getByText(mockFilms.length)).toBeInTheDocument();
    expect(screen.getByText('Catalog')).toBeInTheDocument();
  });
});
