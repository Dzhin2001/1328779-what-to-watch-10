import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../../components/history-route/history-route';
import Footer from './footer';

describe('Component: Footer', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <HistoryRouter history={history}>
        <Footer />
      </HistoryRouter>,
    );


    const spanElementT = screen.getByText('T');
    const spanElementW = screen.getAllByText('W');
    const textElement = screen.getByText('© 2019 What to watch Ltd.');

    expect(spanElementT).toBeInTheDocument();
    expect(spanElementW.length).toEqual(2);
    expect(textElement).toBeInTheDocument();
  });
});
