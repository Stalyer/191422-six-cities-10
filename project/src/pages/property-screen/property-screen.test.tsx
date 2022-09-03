import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {makeFakeOffers, makeFakeOffer, makeFakeReviews} from '../../utils/mocks';
import {NameSpace, AuthorizationStatus, CITIES, SortType, AppRoute} from '../../const';
import HistoryRouter from '../../components/history-router/history-router';
import PropertyScreen from './property-screen';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const store = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeOffers = makeFakeOffers();
const fakeOffer = makeFakeOffer();
const fakeReviews = makeFakeReviews();

const offerStore = store({
  [NameSpace.Offers]: {
    offers: [],
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

const noOfferStore = store({
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

describe('Component: PropertyScreen', () => {
  beforeEach(() => {
    history.push(`${AppRoute.Room}/${fakeOffer.id}`);
  });

  it('should render correctly', () => {

    render(
      <Provider store={offerStore}>
        <HistoryRouter history={history}>
          <PropertyScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(new RegExp(fakeOffer.title, 'i'))).toBeInTheDocument();
  });

  it('should render not found page', () => {

    render(
      <Provider store={noOfferStore}>
        <HistoryRouter history={history}>
          <NotFoundScreen />
        </HistoryRouter>
      </Provider>,
    );

    expect(screen.getByText(/404. Page not found/i)).toBeInTheDocument();
  });
});
