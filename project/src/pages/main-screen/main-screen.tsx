import {useState} from 'react';
import {useAppSelector} from '../../hooks';
import {getOffers, getLoadedDataStatus} from '../../store/offers-process/selectors';
import {getCurrentCity, getCurrentSorting} from '../../store/main-process/selectors';
import {SortType} from '../../const';
import {sortOfferPriceAsc, sortOfferPriceDesc, sortOfferTopRated} from '../../utils/utils';
import CityList from '../../components/city-list/city-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import PlacesSorting from '../../components/places-sorting/places-sorting';
import UserNav from '../../components/user-nav/user-nav';
import LoadingScreen from '../../pages/loading-screen/loading-screen';
import {Offer} from '../../types/offer';

function MainScreen(): JSX.Element {
  const [activeOffer, setActiveOffer] = useState<Offer | undefined>(undefined);

  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const currentSorting = useAppSelector(getCurrentSorting);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  let currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const offersCount = currentCityOffers.length;

  switch (currentSorting) {
    case SortType.priceAsc:
      currentCityOffers = currentCityOffers.sort(sortOfferPriceAsc);
      break;
    case SortType.priceDesc:
      currentCityOffers = currentCityOffers.sort(sortOfferPriceDesc);
      break;
    case SortType.topRated:
      currentCityOffers = currentCityOffers.sort(sortOfferTopRated);
      break;
  }

  if (isDataLoaded) {
    return (
      <LoadingScreen />
    );
  }

  return (
    <div className="page page--gray page--main">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserNav />
          </div>
        </div>
      </header>

      <main className={`page__main page__main--index${offersCount === 0 ? ' page__main--index-empty' : ''}`}>
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <CityList />
        </div>
        {offersCount > 0 ?
          <div className="cities">
            <div className="cities__places-container container">
              <section className="cities__places places">
                <h2 className="visually-hidden">Places</h2>
                <b className="places__found">{offersCount} places to stay in {currentCity}</b>
                <PlacesSorting />
                <OfferList offers={currentCityOffers} onCardHover={setActiveOffer} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={currentCityOffers} selectedOffer={activeOffer} />
                </section>
              </div>
            </div>
          </div>
          :
          <div className="cities__places-container cities__places-container--empty container" style={{height: '100%'}}>
            <section className="cities__no-places">
              <div className="cities__status-wrapper tabs__content">
                <b className="cities__status">No places to stay available</b>
                <p className="cities__status-description">We could not find any property available at the moment in {currentCity}</p>
              </div>
            </section>
            <div className="cities__right-section"></div>
          </div>}
      </main>
    </div>
  );
}

export default MainScreen;
