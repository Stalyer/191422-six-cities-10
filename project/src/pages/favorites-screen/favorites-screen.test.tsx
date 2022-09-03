import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffers} from '../../utils/mocks';
import {NameSpace, AuthorizationStatus, CITIES, SortType} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import FavoritesScreen from './favorites-screen';

const store = configureMockStore();
const fakeOffers = makeFakeOffers();

const offersStore = store({
  [NameSpace.Offers]: {
    offers: [],
    favoriteOffers: fakeOffers,
    isDataLoaded: false
  },
  [NameSpace.Offer]: {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isDataLoaded: false
  },
  [NameSpace.Main]: {
    currentCity: CITIES[0],
    currentSorting: SortType.popular
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: null
  },
});

const noOffersStore = store({
  [NameSpace.Offers]: {
    offers: [],
    favoriteOffers: [],
    isDataLoaded: false
  },
  [NameSpace.Offer]: {
    offer: null,
    nearbyOffers: [],
    reviews: [],
    isDataLoaded: false
  },
  [NameSpace.Main]: {
    currentCity: CITIES[0],
    currentSorting: SortType.popular
  },
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
    userInfo: null
  },
});

describe('Component: FavoritesScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={offersStore}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
  });

  it('should render no favorites', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={noOffersStore}>
        <HistoryRouter history={history}>
          <FavoritesScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Nothing yet saved./i)).toBeInTheDocument();
  });
});
