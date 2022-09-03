import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import ReviewsList from './reviews-list';
import {NameSpace, AuthorizationStatus} from '../../const';
import {makeFakeReviews} from '../../utils/mocks';

const mockStore = configureMockStore();
const history = createMemoryHistory();
const fakeReviews = makeFakeReviews();
const fakeStore = mockStore({
  [NameSpace.User]: {
    authorizationStatus: AuthorizationStatus.NoAuth
  }
});

describe('Component: ReviewsList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <ReviewsList reviews={fakeReviews} />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(fakeReviews[0].comment, 'i'))).toBeInTheDocument();
  });
});
