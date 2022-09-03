import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import PlacesSorting from './places-sorting';
import userEvent from '@testing-library/user-event';
import {NameSpace, SortType, SORT_TYPE_NAME} from '../../const';

const api = createAPI();
const middlewares = [thunk.withExtraArgument(api)];
const mockStore = configureMockStore(middlewares);
const history = createMemoryHistory();

const fakeStore = mockStore({
  [NameSpace.Main]: {
    currentSorting: SortType.popular
  },
});

describe('Component: PlacesSorting', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <PlacesSorting />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(/Sort by/i)).toBeInTheDocument();
    expect(screen.getAllByText(new RegExp(SORT_TYPE_NAME[SortType.popular], 'i'))).toHaveLength(2);
  });

  it('should dispatch action when user click on li', async () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <PlacesSorting />
        </HistoryRouter>
      </Provider>
    );

    await userEvent.click(screen.getByText(SORT_TYPE_NAME[SortType.topRated]));

    const actions = fakeStore.getActions();

    expect(actions[0].type).toBe('MAIN/changeSorting');
  });
});
