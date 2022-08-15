import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {getCurrentCity} from '../../store/offer-process/selectors';
import {changeCity} from '../../store/offer-process/offer-process';
import {CITIES} from '../../const';

function CityList(): JSX.Element {
  const currentCity = useAppSelector(getCurrentCity);
  const dispatch = useAppDispatch();

  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {CITIES.map((city) => (
          <li className="locations__item" key={city}>
            <Link to="/" className={`locations__item-link tabs__item ${city === currentCity && 'tabs__item--active'}`} onClick={() => dispatch(changeCity(city))}>
              <span>{city}</span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default CityList;
