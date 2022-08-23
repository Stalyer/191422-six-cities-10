import {useState} from 'react';
import {useAppSelector, useAppDispatch} from '../../hooks';
import {SortType, SORT_TYPE_NAME} from '../../const';
import {changeSorting} from '../../store/main-process/main-process';
import {getCurrentSorting} from '../../store/main-process/selectors';

function PlacesSorting(): JSX.Element {
  const dispatch = useAppDispatch();
  const [isSelectShow, setIsSelectShow] = useState(false);
  const currentSorting = useAppSelector(getCurrentSorting);

  return(
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={() => setIsSelectShow(!isSelectShow)}>
        {SORT_TYPE_NAME[currentSorting]}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul className={`places__options places__options--custom${isSelectShow ? ' places__options--opened' : ''} `}>
        {Object.values(SortType).map((type) => (
          <li
            className={`places__option${type === currentSorting ? ' places__option--active' : ''}`}
            tabIndex={0}
            key={type}
            onClick={() => {
              dispatch(changeSorting(type));
              setIsSelectShow(false);
            }}
          >
            {SORT_TYPE_NAME[type]}
          </li>
        ))}
      </ul>
    </form>
  );
}

export default PlacesSorting;
