import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {makeFakeStore} from '../../utils/mocks';
import HistoryRouter from '../../components/history-router/history-router';
import LoadingScreen from './loading-screen';

describe('Component: LoadingScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={makeFakeStore}>
        <HistoryRouter history={history}>
          <LoadingScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Loading/i)).toBeInTheDocument();
  });
});
