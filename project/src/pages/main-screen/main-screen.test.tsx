import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffers} from '../../utils/mocks';
import {NameSpace, AuthorizationStatus, CITIES, SortType} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import MainScreen from './main-screen';

const store = configureMockStore();
const fakeOffers = makeFakeOffers();

const offersStore = store({
  [NameSpace.Offers]: {
    offers: fakeOffers,
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
    authorizationStatus: AuthorizationStatus.NoAuth,
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
    authorizationStatus: AuthorizationStatus.NoAuth,
    userInfo: null
  },
});

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={offersStore}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(`${fakeOffers.length} places to stay in ${CITIES[0]}`, 'i'))).toBeInTheDocument();
  });

  it('should render no places', () => {
    const history = createMemoryHistory();

    render(
      <Provider store={noOffersStore}>
        <HistoryRouter history={history}>
          <MainScreen />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/No places to stay available/i)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(`We could not find any property available at the moment in ${CITIES[0]}`, 'i'))).toBeInTheDocument();
  });
});
