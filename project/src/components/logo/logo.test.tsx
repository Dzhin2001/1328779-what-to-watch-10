import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Logo from './logo';

describe('Component: Logo', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Logo />
      </HistoryRouter>,
    );

    const spanElementT = screen.getByText('T');
    const spanElementW = screen.getAllByText('W');

    expect(spanElementT).toBeInTheDocument();
    expect(spanElementW.length).toEqual(2);
  });
});
