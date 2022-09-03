import {render, screen} from '@testing-library/react';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import FavoriteCard from './favorite-card';
import {NameSpace, AuthorizationStatus, AppRoute} from '../../const';
import {makeFakeOffer} from '../../utils/mocks';
import userEvent from '@testing-library/user-event';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();
const fakeStore = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  }
});

describe('Component: FavoriteCard', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <FavoriteCard offer={fakeOffer} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(fakeOffer.title, 'i'))).toBeInTheDocument();
  });

  it('should redirect to offer url when user clicked to link', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={`${AppRoute.Room}/${fakeOffer.id}`}
              element={<h1>This is offer page</h1>}
            />
            <Route
              path='*'
              element={<FavoriteCard offer={fakeOffer} />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is offer page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(fakeOffer.title));

    expect(screen.getByText(/This is offer page/i)).toBeInTheDocument();
  });
});
