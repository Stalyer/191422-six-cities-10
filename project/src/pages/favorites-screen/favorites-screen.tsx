import {Link} from 'react-router-dom';
import {useAppSelector} from '../../hooks';
import {getOffers} from '../../store/offer-data/selectors';
import FavoriteList from '../../components/favorite-list/favorite-list';
import Footer from '../../components/footer/footer';
import Logo from '../../components/logo/logo';
import UserNav from '../../components/user-nav/user-nav';

function FavoritesScreen(): JSX.Element {
  const offers = useAppSelector(getOffers);

  return (
    <div className="page">
      <header className="header">
        <div className="container">
          <div className="header__wrapper">
            <Logo />
            <UserNav />
          </div>
        </div>
      </header>

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <Link to="/" className="locations__item-link">
                      <span>Amsterdam</span>
                    </Link>
                  </div>
                </div>
                <FavoriteList offers={offers} />
              </li>
            </ul>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default FavoritesScreen;
