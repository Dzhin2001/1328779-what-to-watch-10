import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import FilmCard from './film-card';
import {makeFakeFilm} from '../../utils/mocks';

describe('Component: FilmCard', () => {
  const mockFilm = makeFakeFilm(0);

  beforeAll(() => {
    window.HTMLMediaElement.prototype.play = jest.fn();
    window.HTMLMediaElement.prototype.pause = jest.fn();
    window.HTMLMediaElement.prototype.load = jest.fn();
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <FilmCard film={mockFilm} />
      </HistoryRouter>,
    );

    const textElement = screen.getByText(mockFilm.name);

    expect(textElement).toBeInTheDocument();
  });
});
