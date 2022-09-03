import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import ButtonPlay from './button-play';
import {makeFakeFilm} from '../../utils/mocks';
import {Provider} from 'react-redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore({});

describe('Component: ButtonPlay', () => {
  const mockFilm = makeFakeFilm(0);

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ButtonPlay idFilm={mockFilm.id} />
        </HistoryRouter>
      </Provider>
    );

    const textElement = screen.getByText('Play');

    expect(textElement).toBeInTheDocument();
  });
});
