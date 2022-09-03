import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import {createMemoryHistory} from 'history';
import HistoryRouter from '../history-router/history-router';
import ReviewsForm from './reviews-form';
import userEvent from '@testing-library/user-event';
import {makeFakeOffer} from '../../utils/mocks';
import {NameSpace} from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const history = createMemoryHistory();
const mockStore = configureMockStore(middlewares);
const fakeOffer = makeFakeOffer();

const fakeStore = mockStore({
  [NameSpace.Offers]: {
    offer: [],
  }
});

describe('Component: ReviewsForm', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ReviewsForm offerId={fakeOffer.id} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
  });

  it('should dispatch action addReviewAction when auth user click on button', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ReviewsForm offerId={fakeOffer.id} />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByTitle(/perfect/i));
    await userEvent.type(screen.getByPlaceholderText(/Tell how was your stay, what you like and what can be improved/i), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.');
    await userEvent.click(screen.getByText('Submit'));

    const actions = fakeStore.getActions();

    expect(actions[0].type).toBe('dataOffer/addReview/pending');
  });
});
