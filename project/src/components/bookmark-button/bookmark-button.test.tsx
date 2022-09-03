import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import BookmarkButton from './bookmark-button';
import userEvent from '@testing-library/user-event';
import {makeFakeOffer} from '../../utils/mocks';
import {NameSpace, AuthorizationStatus, OfferCardType} from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();
const fakeOffer = makeFakeOffer();

const authStore = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.Auth,
  },
});

const noAuthStore = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth,
  },
});

describe('Component: BookmarkButton', () => {
  it('should render correctly', () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <BookmarkButton offerId={fakeOffer.id} isFavorite={fakeOffer.isFavorite} cardType={OfferCardType.Place} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/In bookmarks/i)).toBeInTheDocument();
  });

  it('should dispatch action changeFavoriteStatusAction when user click on button', async () => {
    render(
      <Provider store={authStore}>
        <HistoryRouter history={history}>
          <BookmarkButton offerId={fakeOffer.id} isFavorite={fakeOffer.isFavorite} cardType={OfferCardType.Place} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));

    const actions = authStore.getActions();

    expect(actions[0].type).toBe('dataOffer/changeFavoriteStatus/pending');
  });

  it('should redirect to login url when no auth user clicked to button', async () => {
    render(
      <Provider store={noAuthStore}>
        <HistoryRouter history={history}>
          <BookmarkButton offerId={fakeOffer.id} isFavorite={fakeOffer.isFavorite} cardType={OfferCardType.Place} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByRole('button'));
    const actions = noAuthStore.getActions();
    expect(actions[0].type).toBe('login/redirectToRoute');
  });
});
