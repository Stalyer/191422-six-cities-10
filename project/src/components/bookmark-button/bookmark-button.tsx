import {useAppSelector, useAppDispatch} from '../../hooks';
import {AppRoute, AuthorizationStatus, OfferCardType} from '../../const';
import {redirectToRoute} from '../../store/action';
import {getAuthorizationStatus} from '../../store/user-process/selectors';

type BookmarkButtonProps = {
  isFavorite: boolean;
  cardType: string;
}

function BookmarkButton({isFavorite, cardType} : BookmarkButtonProps): JSX.Element {
  const dispatch = useAppDispatch();
  const authorizationStatus = useAppSelector(getAuthorizationStatus);

  const handleBookmarkClick = () => {
    if (authorizationStatus === AuthorizationStatus.NoAuth) {
      dispatch(redirectToRoute(AppRoute.Login));
    }
  };

  return(
    <button className={`${cardType}__bookmark-button button${isFavorite ? ` ${cardType}__bookmark-button--active` : ''}`} type="button" onClick={handleBookmarkClick}>
      {cardType === OfferCardType.Property ?
        <svg className="property__bookmark-icon" width="31" height="33">
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
