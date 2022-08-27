import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute, AuthorizationStatus, OfferCardType} from '../../const';
import {redirectToRoute} from '../../store/action';
import {changeFavoriteStatusAction} from '../../store/api-actions';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type BookmarkButtonProps = {
  offerId: number,
  isFavorite: boolean,
  cardType: string;
}

function BookmarkButton({offerId, isFavorite, cardType} : BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);
  const favoriteDate = {
    offerId: offerId,
    favoriteStatus: isFavorite ? 0 : 1
  };

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
    } else {
      dispatch(changeFavoriteStatusAction(favoriteDate));
    }
  };

  return(
    <button className={`${cardType}__bookmark-button button${isFavorite ? ` ${cardType}__bookmark-button--active` : ''}`} type="button" onClick={handleBookmarkClick}>
      {cardType === OfferCardType.Property ?
        <svg className="place-card__bookmark-icon" width="31" height="33">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>
        :
        <svg className="place-card__bookmark-icon" width="18" height="19">
          <use xlinkHref="#icon-bookmark"></use>
        </svg>}
      <span className="visually-hidden">{`${isFavorite ? 'In' : 'to'} bookmarks`}</span>
    </button>
  );
}

export default BookmarkButton;
