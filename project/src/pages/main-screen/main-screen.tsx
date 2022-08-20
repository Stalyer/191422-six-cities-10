import {useAppSelector} from '../../hooks';
import {getOffers} from '../../store/offer-data/selectors';
import {getCurrentCity} from '../../store/offer-process/selectors';
import {getLoadedDataStatus} from '../../store/offer-data/selectors';
import CityList from '../../components/city-list/city-list';
import Logo from '../../components/logo/logo';
import Map from '../../components/map/map';
import OfferList from '../../components/offer-list/offer-list';
import UserNav from '../../components/user-nav/user-nav';
import LoadingScreen from '../../pages/loading-screen/loading-screen';

function MainScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);
  const currentCity = useAppSelector(getCurrentCity);
  const isDataLoaded = useAppSelector(getLoadedDataStatus);
  const currentCityOffers = offers.filter((offer) => offer.city.name === currentCity);
  const offersCount = currentCityOffers.length;

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

      <main className={`page__main page__main--index ${offersCount === 0 && 'page__main--index-empty'}`} >
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
                <form className="places__sorting" action="#" method="get">
                  <span className="places__sorting-caption">Sort by </span>
                  <span className="places__sorting-type" tabIndex={0}>
                    Popular
                    <svg className="places__sorting-arrow" width="7" height="4">
                      <use xlinkHref="#icon-arrow-select"></use>
                    </svg>
                  </span>
                  <ul className="places__options places__options--custom places__options--opened">
                    <li className="places__option places__option--active" tabIndex={0}>Popular</li>
                    <li className="places__option" tabIndex={0}>Price: low to high</li>
                    <li className="places__option" tabIndex={0}>Price: high to low</li>
                    <li className="places__option" tabIndex={0}>Top rated first</li>
                  </ul>
                </form>
                <OfferList offers={currentCityOffers} />
              </section>
              <div className="cities__right-section">
                <section className="cities__map map">
                  <Map offers={currentCityOffers} selectedOffer={currentCityOffers[0]} />
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
