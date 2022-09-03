import {Action} from 'redux';
import thunk, {ThunkDispatch} from 'redux-thunk';
import MockAdapter from 'axios-mock-adapter';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createAPI} from '../services/api';
import {
  fetchOffersAction,
  fetchFavoriteOffersAction,
  fetchOfferAction,
  fetchNearbyOffersAction,
  fetchReviewsAction,
  changeFavoriteStatusAction,
  addReviewAction,
  checkAuthAction,
  loginAction,
  logoutAction} from './api-actions';
import {APIRoute} from '../const';
import {State} from '../types/state';
import {AuthData} from '../types/auth-data';
import {FavoriteData} from '../types/favorite-date';
import {ReviewData} from '../types/review-data';
import {makeFakeOffer, makeFakeOffers, makeFakeReviews} from '../utils/mocks';
import {redirectToRoute} from './action';

describe('Async actions', () => {
  const api = createAPI();
  const mockAPI = new MockAdapter(api);
  const middlewares = [thunk.withExtraArgument(api)];

  const mockStore = configureMockStore<
      State,
      Action,
      ThunkDispatch<State, typeof api, Action>
    >(middlewares);

  it('should dispatch fetchOffersAction when GET /hotels', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Hotels)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOffersAction.pending.type,
      fetchOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchFavoriteOffersAction when GET /favorite', async () => {
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(APIRoute.Favorite)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchFavoriteOffersAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchFavoriteOffersAction.pending.type,
      fetchFavoriteOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchOfferAction when GET /hotels', async () => {
    const mockOffer = makeFakeOffer();
    mockAPI
      .onGet(`${APIRoute.Hotels}/${mockOffer.id}`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(fetchOfferAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchOfferAction.pending.type,
      fetchOfferAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchNearbyOffersAction when GET /hotels', async () => {
    const mockOffer = makeFakeOffer();
    const mockOffers = makeFakeOffers();
    mockAPI
      .onGet(`${APIRoute.Hotels}/${mockOffer.id}/nearby`)
      .reply(200, mockOffers);

    const store = mockStore();

    await store.dispatch(fetchNearbyOffersAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchNearbyOffersAction.pending.type,
      fetchNearbyOffersAction.fulfilled.type
    ]);
  });

  it('should dispatch fetchReviewsAction when GET /hotels', async () => {
    const mockOffer = makeFakeOffer();
    const mockReviews = makeFakeReviews();

    mockAPI
      .onGet(`${APIRoute.Comments}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(fetchReviewsAction(String(mockOffer.id)));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      fetchReviewsAction.pending.type,
      fetchReviewsAction.fulfilled.type
    ]);
  });

  it('should dispatch changeFavoriteStatusAction when POST /favorite', async () => {
    const mockOffer = makeFakeOffer();
    const fakeChangedFavorite: FavoriteData = {
      offerId: mockOffer.id,
      favoriteStatus: 0
    };

    mockAPI
      .onPost(`${APIRoute.Favorite}/${mockOffer.id}/0`)
      .reply(200, mockOffer);

    const store = mockStore();

    await store.dispatch(changeFavoriteStatusAction(fakeChangedFavorite));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      changeFavoriteStatusAction.pending.type,
      changeFavoriteStatusAction.fulfilled.type
    ]);
  });

  it('should dispatch addReviewAction when POST /comments', async () => {
    const mockOffer = makeFakeOffer();
    const mockReviews = makeFakeReviews();
    const fakeAddedReview: ReviewData = {
      offerId: mockOffer.id,
      review: 'test',
      rating: 5
    };

    mockAPI
      .onPost(`${APIRoute.Comments}/${mockOffer.id}`)
      .reply(200, mockReviews);

    const store = mockStore();

    await store.dispatch(addReviewAction(fakeAddedReview));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      addReviewAction.pending.type,
      addReviewAction.fulfilled.type
    ]);
  });

  it('should authorization status is «auth» when server return 200', async () => {
    const store = mockStore();
    mockAPI
      .onGet(APIRoute.Login)
      .reply(200, []);

    expect(store.getActions()).toEqual([]);

    await store.dispatch(checkAuthAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      checkAuthAction.pending.type,
      checkAuthAction.fulfilled.type
    ]);
  });

  it('should dispatch RequriedAuthorization and RedirectToRoute when POST /login', async () => {
    const fakeUser: AuthData = {
      login: 'test@test.ru',
      password: '123456'
    };

    mockAPI
      .onPost(APIRoute.Login)
      .reply(200, {token: 'secret'});


    const store = mockStore();
    Storage.prototype.setItem = jest.fn();

    await store.dispatch(loginAction(fakeUser));

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      loginAction.pending.type,
      redirectToRoute.type,
      loginAction.fulfilled.type
    ]);

    expect(Storage.prototype.setItem).toBeCalledTimes(1);
    expect(Storage.prototype.setItem).toBeCalledWith('six-cities-token', 'secret');
  });

  it('should dispatch Logout when Delete /logout', async () => {
    mockAPI
      .onDelete(APIRoute.Logout)
      .reply(204);

    const store = mockStore();
    Storage.prototype.removeItem = jest.fn();

    await store.dispatch(logoutAction());

    const actions = store.getActions().map(({type}) => type);

    expect(actions).toEqual([
      logoutAction.pending.type,
      logoutAction.fulfilled.type
    ]);

    expect(Storage.prototype.removeItem).toBeCalledTimes(1);
    expect(Storage.prototype.removeItem).toBeCalledWith('six-cities-token');
  });
});
