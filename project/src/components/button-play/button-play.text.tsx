import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import ButtonPlay from './button-play';
import {makeFakeFilm} from '../../utils/mocks';

describe('Component: ButtonPlay', () => {
  const mockFilm = makeFakeFilm(0);

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <ButtonPlay idFilm={mockFilm.id} />
      </HistoryRouter>
    );

    const textElement = screen.getByText('Play');

    expect(textElement).toBeInTheDocument();
  });
});
