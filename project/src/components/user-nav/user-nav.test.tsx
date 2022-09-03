import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import UserNav from './user-nav';
import userEvent from '@testing-library/user-event';
import {makeFakeUser} from '../../utils/mocks';
import {NameSpace, AuthorizationStatus, AppRoute} from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
const fakeUser = makeFakeUser();

const noAuthStore = mockStore({
  [NameSpace.Offers]: {
    favoriteOffers: [],
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null
  }
});

const authStore = mockStore({
  [NameSpace.Offers]: {
    favoriteOffers: [],
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: fakeUser
  }
});

describe('Component: UserNav', () => {
  it('should render Sign in correctly', () => {
    render(
      <Provider store={noAuthStore}>
        <HistoryRouter history={history}>
          <UserNav />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render Sign out correctly', () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <UserNav />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should redirect to login url when no auth user clicked to link', async () => {
    render(
      <Provider store={noAuthStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Login}
              element={<h1>This is login page</h1>}
            />
            <Route
              path='*'
              element={<UserNav />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is login page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByRole('link'));

    expect(screen.getByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should redirect to favorites url when auth user clicked to link', async () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Favorites}
              element={<h1>This is favorite page</h1>}
            />
            <Route
              path='*'
              element={<UserNav />}
            />
          </Routes>
        </HistoryRouter>
      </Provider>
    );

    expect(screen.queryByText(/This is favorite page/i)).not.toBeInTheDocument();

    await userEvent.click(screen.getByText(fakeUser.email));

    expect(screen.getByText(/This is favorite page/i)).toBeInTheDocument();
  });

  it('should dispatch action logoutAction when auth user click on button', async () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <UserNav />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(/Sign out/i));

    const actions = authStore.getActions();

    expect(actions[0].type).toBe('user/logout/pending');
  });
});
