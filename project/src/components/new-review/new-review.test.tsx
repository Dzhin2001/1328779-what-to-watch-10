import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import {Provider} from 'react-redux';
import {makeFakeFilm} from '../../utils/mocks';
import {NameSpace} from '../../const';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {State} from '../../types/state';
import {AnyAction} from 'redux';
import NewReview from './new-review';
import userEvent from '@testing-library/user-event';

const mockFilm = makeFakeFilm(2);
const initialState = {
  [NameSpace.Review]: {
    reviews: [],
    isFormBlocked: false,
  },
};

const mockStore = configureMockStore<State, AnyAction>();
const store = mockStore(initialState);

describe('Component: NewReview', () => {

  it('should render correctly ', async () => {
    const history = createMemoryHistory();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <NewReview film={mockFilm} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByTestId('star-1')).toBeInTheDocument();
    expect(screen.getByTestId('star-10')).toBeInTheDocument();
    expect(screen.getByText('Post')).toBeInTheDocument();

    await userEvent.type(screen.getByTestId('reviewText'),'Hellow world!');
    expect(screen.getByDisplayValue('Hellow world!')).toBeInTheDocument();

  });
});
