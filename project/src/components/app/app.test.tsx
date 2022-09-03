import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffers, makeFakeOffer, makeFakeReviews, makeFakeUser} from '../../utils/mocks';
import HistoryRouter from '../history-router/history-router';
import {NameSpace, CITIES, SortType, AuthorizationStatus, AppRoute} from '../../const';
import App from './app';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();
const fakeUser = makeFakeUser();

const authStore = mockStore({
  [NameSpace.Offers]: {
    offers: fakeOffers,
    favoriteOffers: fakeOffers,
    isDataLoaded: false
  },
  [NameSpace.Offer]: {
    offer: fakeOffer,
    nearbyOffers: fakeOffers,
    reviews: fakeReviews,
    isDataLoaded: false
  },
  [NameSpace.Main]: {
    currentCity: CITIES[0],
    currentSorting: SortType.popular
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: fakeUser
  },
});

const noAuthStore = mockStore({
  [NameSpace.Offers]: {
    offers: fakeOffers,
    favoriteOffers: [],
    isDataLoaded: false
  },
  [NameSpace.Offer]: {
    offer: fakeOffer,
    nearbyOffers: fakeOffers,
    reviews: fakeReviews,
    isDataLoaded: false
  },
  [NameSpace.Main]: {
    currentCity: CITIES[0],
    currentSorting: SortType.popular
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null
  },
});

const history = createMemoryHistory();

const fakeAppAuth = (
  <Provider store={authStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

const fakeAppNoAuth = (
  <Provider store={noAuthStore}>
    <HistoryRouter history={history}>
      <App />
    </HistoryRouter>
  </Provider>
);

describe('Application Routing', () => {
  it('should render "MainScreen" when user navigate to "/"', () => {
    history.push(AppRoute.Root);

    render(fakeAppAuth);

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${CITIES[0]}`, 'i'))).toBeInTheDocument();
  });

  it('should render "LoginScreen" when user navigate to "/login"', () => {
    history.push(AppRoute.Login);

    render(fakeAppNoAuth);

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2);
    expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
  });

  it('should render "PropertyScreen" when user navigate to "/offer"', () => {
    history.push(`${AppRoute.Room}/${fakeOffer.id}`);

    render(fakeAppAuth);

    expect(screen.getByText(new RegExp(fakeOffer.title, 'i'))).toBeInTheDocument();
  });

  it('should render "FavoritesScreen" when user navigate to "/favorites"', () => {
    history.push(AppRoute.Favorites);

    render(fakeAppAuth);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render "NotFoundScreen" when user navigate to non-existent route', () => {
    history.push('/non-existent-route');

    render(fakeAppAuth);

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
    expect(screen.getByText(/Go back to the main page/i)).toBeInTheDocument();
  });
});
