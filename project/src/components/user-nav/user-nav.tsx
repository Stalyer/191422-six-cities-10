import {Link} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {logoutAction} from '../../store/api-actions';
import {AppRoute, AuthorizationStatus} from '../../const';
import {getAuthorizationStatus, getUserInfo} from '../../store/user-process/selectors';
import {getOffersFavorite} from '../../store/offers-process/selectors';

function UserNav(): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const userInfo = useAppSelector(getUserInfo);
  const favoriteOffers = useAppSelector(getOffersFavorite);

  return(
    <nav className="header__nav">
      {authorizationStatus === AuthorizationStatus.Auth ?
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.Favorites} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper" style={userInfo.avatarUrl ? {backgroundImage: `url(${userInfo.avatarUrl})`} : {}}></div>
              <span className="header__user-name user__name">{userInfo.email}</span>
              <span className="header__favorite-count">{favoriteOffers.length}</span>
            </Link>
          </li>
          <li className="header__nav-item">
            <Link to="" className="header__nav-link" onClick={() => dispatch(logoutAction())}>
              <span className="header__signout">Sign out</span>
            </Link>
          </li>
        </ul>
        :
        <ul className="header__nav-list">
          <li className="header__nav-item user">
            <Link to={AppRoute.Login} className="header__nav-link header__nav-link--profile">
              <div className="header__avatar-wrapper user__avatar-wrapper"></div>
              <span className="header__login">Sign in</span>
            </Link>
          </li>
        </ul>}
    </nav>
  );
}

export default UserNav;
