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
import {makeFakeReviews, makeFakeUserData} from '../../utils/mocks';
import ReviewCard from './review-card';

const fakeUserData = makeFakeUserData();
const fakeReviews = makeFakeReviews(1);
const fakeReview = fakeReviews[0];

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore<State, AnyAction>(middlewares);
const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: fakeUserData,
    favoriteFilms: [],
  },
};

const store = mockStore(initialState);
const history = createMemoryHistory();

describe('Component: ReviewCard', () => {

  it('should render correctly ', async () => {
    history.push('/login');

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ReviewCard review={fakeReview} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(fakeReview.comment)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.user.name)).toBeInTheDocument();
    expect(screen.getByText(fakeReview.rating)).toBeInTheDocument();
  });
});
