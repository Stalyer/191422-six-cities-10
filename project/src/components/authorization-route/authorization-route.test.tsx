import {Routes, Route} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import {AppRoute, AuthorizationStatus} from '../../const';
import AuthorizationRoute from './authorization-route';

const mockStore = configureMockStore();
const history = createMemoryHistory();

describe('Component: AuthorizationRoute', () => {
  beforeEach(() => {
    history.push(AppRoute.Login);
  });

  it('should render component for Root route, when user authorized', () => {
    const store = mockStore({
      USER: {authorizationStatus: AuthorizationStatus.Auth},
    });

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>Root Route</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <AuthorizationRoute
                  authorizationStatus={AuthorizationStatus.Auth}
                >
                  <h1>Authorization Route</h1>
                </AuthorizationRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Root Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Authorization Route/i)).not.toBeInTheDocument();
  });

  it('should render component for Authorization route, when user not authorized', () => {
    const store = mockStore();

    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <Routes>
            <Route
              path={AppRoute.Root}
              element={<h1>Root Route</h1>}
            />
            <Route
              path={AppRoute.Login}
              element={
                <AuthorizationRoute
                  authorizationStatus={AuthorizationStatus.NoAuth}
                >
                  <h1>Authorization Route</h1>
                </AuthorizationRoute>
              }
            />
          </Routes>
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/Authorization Route/i)).toBeInTheDocument();
    expect(screen.queryByText(/Root Route/i)).not.toBeInTheDocument();
  });
});
