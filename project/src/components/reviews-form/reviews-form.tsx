import {useState, Fragment, FormEvent, ChangeEvent} from 'react';
import {useAppDispatch} from '../../hooks';
import {Ratings} from '../../types/rating';
import {COMMENT_LENGTH_MIN, COMMENT_LENGTH_MAX} from '../../const';
import {addReviewAction} from '../../store/api-actions';

const ratings: Ratings = [
  {
    value: 5,
    title: 'perfect'
  },
  {
    value: 4,
    title: 'good'
  },
  {
    value: 3,
    title: 'not bad'
  },
  {
    value: 2,
    title: 'badly'
  },
  {
    value: 1,
    title: 'terribly'
  }
];

type ReviewsFormProps = {
  offerId: number;
}

function ReviewsForm({offerId} : ReviewsFormProps): JSX.Element {
  const dispatch = useAppDispatch();
  const [reviewForm, setReviewForm] = useState({
    offerId: offerId,
    review: '',
    rating: 0
  });
  const [isReviewFormDisabled, setIsReviewFormDisabled] = useState(false);

  return(
    <form
      className="reviews__form form"
      action=""
      method="post"
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        evt.preventDefault();
        if (reviewForm.rating && reviewForm.review) {
          setIsReviewFormDisabled(true);
          dispatch(addReviewAction(reviewForm)).then((response) => {
            const requestStatus = response.meta.requestStatus;
            if (requestStatus === 'rejected') {
              setIsReviewFormDisabled(false);
            }

            if (requestStatus === 'fulfilled') {
              setReviewForm({...reviewForm, review : '', rating: 0});
              setIsReviewFormDisabled(false);
            }
          });
        }
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <div className="reviews__rating-form form__rating">
        {ratings.map(({value, title}) => (
          <Fragment key={value}>
            <input
              className="form__rating-input visually-hidden"
              name="rating"
              value={value}
              id={`${value}-stars`}
              type="radio"
              onChange={({target}: ChangeEvent<HTMLInputElement>) => {
                setReviewForm({...reviewForm, rating: parseInt(target.value, 10)});
              }}
              checked={value === reviewForm.rating}
              disabled={isReviewFormDisabled}
            />
            <label
              htmlFor={`${value}-stars`}
              className="reviews__rating-label form__rating-label"
              title={title}
            >
              <svg className="form__star-image" width="37" height="33">
                <use xlinkHref="#icon-star"></use>
              </svg>
            </label>
          </Fragment>
        ))}
      </div>
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={reviewForm.review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={({target}: ChangeEvent<HTMLTextAreaElement>) => {
          setReviewForm({...reviewForm, review: target.value});
        }}
        disabled={isReviewFormDisabled}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={
            isReviewFormDisabled ||
            reviewForm.rating === 0 ||
            reviewForm.review.length < COMMENT_LENGTH_MIN ||
            reviewForm.review.length > COMMENT_LENGTH_MAX
          }
        >
          Submit
        </button>
      </div>
    </form>
  );
}

export default ReviewsForm;
