import dayjs from 'dayjs';
import {REVIEW_ITEMS_MAX} from '../../const';
import {Review, Reviews} from '../../types/review';
import {calcWidthRating} from '../../utils/utils';

type ReviewsListProps = {
  reviews: Reviews;
}

const getWeightForNullDate = (dateA: string, dateB: string) => {
  if (dateA === null && dateB === null) {
    return 0;
  }

  if (dateA === null) {
    return 1;
  }

  if (dateB === null) {
    return -1;
  }

  return null;
};

const sortReviewsDate = (reviewA: Review, reviewB: Review) => {
  const weight = getWeightForNullDate(reviewA.date, reviewB.date);

  return weight ?? dayjs(reviewB.date).diff(dayjs(reviewA.date));
};

function ReviewsList({reviews} : ReviewsListProps): JSX.Element {
  let sortedReviews = reviews.slice();
  sortedReviews.sort(sortReviewsDate);
  sortedReviews = sortedReviews.slice(0, REVIEW_ITEMS_MAX);

  return (
    <ul className="reviews__list">
      {sortedReviews.map(({id, comment, date, rating, user}) => (
        <li className="reviews__item" key={id}>
          <div className="reviews__user user">
            <div className="reviews__avatar-wrapper user__avatar-wrapper">
              <img className="reviews__avatar user__avatar" src={user.avatarUrl} width="54" height="54" alt={user.name} />
            </div>
            <span className="reviews__user-name">
              {user.name}
            </span>
          </div>
          <div className="reviews__info">
            <div className="reviews__rating rating">
              <div className="reviews__stars rating__stars">
                <span style={{width: `${calcWidthRating(rating)}%`}}></span>
                <span className="visually-hidden">Rating</span>
              </div>
            </div>
            <p className="reviews__text">
              {comment}
            </p>
            <time className="reviews__time" dateTime={date}>{dayjs(date).format('MMM YYYY')}</time>
          </div>
        </li>
      ))}
    </ul>
  );
}

export default ReviewsList;
