import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeInitialFilms} from '../../utils/mocks';
import ButtonAddFavorite from './button-add-favorite';
import {AuthorizationStatus, NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';

const TEST_FILM_COUNT = 11;
const mockFilms = makeFakeInitialFilms(TEST_FILM_COUNT);

const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: null,
    favoriteFilms: mockFilms,
  },
};
const mockStore = configureMockStore<State, AnyAction>();
const store = mockStore(initialState);

describe('Component: ButtonAddFavorite', () => {

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ButtonAddFavorite idFilm={mockFilms[0].id} />
        </HistoryRouter>
      </Provider>
    );

    const textElement = screen.getByText('My list');
    const lengthElement = screen.getByText(TEST_FILM_COUNT);

    expect(textElement).toBeInTheDocument();
    expect(lengthElement).toBeInTheDocument();
  });
});
