import {useAppSelector} from '../../hooks';
import {getOffersFavorite} from '../../store/offers-process/selectors';
import FavoriteCitiesList from '../../components/favorite-cities-list/favorite-cities-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';
import {Favorites} from '../../types/favorites';
import {filterOfferToCity} from '../../utils/utils';

function FavoritesScreen(): JSX.Element {
  const offersFavorite = useAppSelector(getOffersFavorite);
  const offersFavoriteCount = offersFavorite.length;
  const favorites : Favorites = offersFavoriteCount > 0 ? filterOfferToCity(offersFavorite) : [];

  return (
    <div className={`page${offersFavoriteCount === 0 ? '  page--favorites-empty' : ''}`}>
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserNav />
          </div>
        </div>
      </header>

      <main className={`page__main page__main--favorites${offersFavoriteCount === 0 ? '  page__main--favorites-empty' : ''}`}>
        <div className="page__favorites-container container">
          {offersFavoriteCount > 0 ?
            <section className="favorites">
              <h1 className="favorites__title">Saved listing</h1>
              <FavoriteCitiesList favorites={favorites} />
            </section>
            :
            <section className="favorites favorites--empty">
              <h1 className="visually-hidden">Favorites (empty)</h1>
              <div className="favorites__status-wrapper">
                <b className="favorites__status">Nothing yet saved.</b>
                <p className="favorites__status-description">Save properties to narrow down search or plan your future trips.</p>
              </div>
            </section>}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
