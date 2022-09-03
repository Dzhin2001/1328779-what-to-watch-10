import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {AuthorizationStatus, NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import SignIn from './sign-in';


const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: null,
    favoriteFilms: [],
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore(initialState);

describe('Component: SignIn', () => {


  it('should render correctly', async () => {
    const history = createMemoryHistory();
    history.push(`/login}`);

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <SignIn />
        </HistoryRouter>
      </Provider>
    );

    const titleElement = screen.getAllByText('Sign in');
    const emailElement = screen.getByText('Email address');
    const passwordElement = screen.getByText('Password');

    expect(titleElement.length).toEqual(2);
    expect(emailElement).toBeInTheDocument();
    expect(passwordElement).toBeInTheDocument();
  });
});
