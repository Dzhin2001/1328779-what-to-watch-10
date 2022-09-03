import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import {createAPI} from '../../services/api';
import thunk from 'redux-thunk';
import {makeFakeReviews} from '../../utils/mocks';
import FilmReviews from './film-reviews';

const mockReviews = makeFakeReviews(2);

const initialState = {
  [NameSpace.Review]: {
    reviews: mockReviews,
    isFormBlocked: false,
  },
};

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const store = mockStore(initialState);
const history = createMemoryHistory();

describe('Component: FilmReviews', () => {

  it('should render correctly ', async () => {

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <FilmReviews id={'-1'} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockReviews[0].comment)).toBeInTheDocument();
    expect(screen.getByText(mockReviews[1].comment)).toBeInTheDocument();
  });

});
