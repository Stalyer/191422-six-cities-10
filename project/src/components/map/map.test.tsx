import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import {configureMockStore} from '@jedmao/redux-mock-store';
import Map from './map';
import {NameSpace, CITIES} from '../../const';
import {makeFakeOffers} from '../../utils/mocks';

const mockStore = configureMockStore();
const fakeOffers = makeFakeOffers();
const fakeStore = mockStore({
  [NameSpace.Main]: {
    currentCity: CITIES[0]
  },
});

describe('Component: Map', () => {
  it('should render correctly', () => {
    render(
      <Provider store={fakeStore}>
        <Map offers={fakeOffers} selectedOffer={undefined} />
      </Provider>
    );

    expect(screen.getByText(/Leaflet/i)).toBeInTheDocument();
  });
});
