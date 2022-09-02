import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mocks';
import {AuthorizationStatus, NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import AddReview from './add-review';
import Router from 'react-router-dom';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

const mockFilm = makeFakeFilm(2);

const initialState = {
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userData: null,
    favoriteFilms: [],
  },
  [NameSpace.Film]: {
    initialFilms: [mockFilm],
    promoFilm: null,
    film: null,
    similarFilms: [],
    isDataLoaded: false,
  },
  [NameSpace.Review]: {
    reviews: [],
    isFormBlocked: false,
  },
};
const mockStore = configureMockStore<State, AnyAction>();
const store = mockStore(initialState);

describe('Component: AddReview', () => {

  it('should render correctly', async () => {
    const history = createMemoryHistory();
    history.push(`/films/${mockFilm.id}/review`);

    jest.spyOn(Router, 'useParams').mockReturnValue({ id: mockFilm.id.toString() });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <AddReview />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(mockFilm.name)).toBeInTheDocument();
    expect(screen.getByText('Add review')).toBeInTheDocument();
  });
});
