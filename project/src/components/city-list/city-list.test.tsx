import {render, screen} from '@testing-library/react';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import HistoryRouter from '../history-router/history-router';
import CityList from './city-list';
import {NameSpace, CITIES} from '../../const';

const history = createMemoryHistory();
const store = configureMockStore();

const fakeStore = store({
  [NameSpace.Main]: {
    currentCity: CITIES[0]
  }
});

describe('Component: CityList', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <HistoryRouter history={history}>
          <CityList />
        </HistoryRouter>
      </Provider>
    );

    expect(screen.getByText(new RegExp(CITIES[0], 'i'))).toBeInTheDocument();
  });
});
