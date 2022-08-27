import {Link} from 'react-router-dom';
import {useAppDispatch} from '../../hooks';
import {changeCity} from '../../store/main-process/main-process';
import FavoriteList from '../../components/favorite-list/favorite-list';
import {Favorites} from '../../types/favorites';

type FavoriteListProps = {
  favorites: Favorites;
}

function FavoriteCitiesList({favorites} : FavoriteListProps): JSX.Element {
  const dispatch = useAppDispatch();

  return (
    <ul className="favorites__list">
      {favorites.map(({cityName, offers}) => (
        <li className="favorites__locations-items" key={cityName}>
          <div className="favorites__locations locations locations--current">
            <div className="locations__item">
              <Link to="/" className="locations__item-link" onClick={() => dispatch(changeCity(cityName))}>
                <span>{cityName}</span>
              </Link>
            </div>
          </div>
          <FavoriteList offers={offers} />
        </li>
      ))}
    </ul>
  );
}

export default FavoriteCitiesList;
