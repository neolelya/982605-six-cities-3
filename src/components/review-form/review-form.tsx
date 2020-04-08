import * as React from 'react';
import {OffersRestriction} from '../../consts';

interface Props {
  id: number;
  onReviewSubmit(
    id: number,
    {comment: review, rating}: { comment: string; rating: number }
  ): Promise<void>;
  isSending: boolean;
  isError: boolean;
  review: string;
  rating: number;
  onInputChange: (evt: React.ChangeEvent) => void;
  onFormReset: () => void;
}

const ReviewForm: React.FC<Props> = (props: Props) => {
  const {
    id,
    review,
    rating,
    onReviewSubmit,
    onInputChange,
    onFormReset,
    isSending,
    isError,
  } = props;

  const isSubmitButtonDisabled = !(
    !isSending &&
    review.length >= OffersRestriction.MIN_REVIEW_LENGTH &&
    review.length <= OffersRestriction.MAX_REVIEW_LENGTH &&
    rating
  );

  const handleFormSubmit = () => {
    if (
      review.length >= OffersRestriction.MIN_REVIEW_LENGTH &&
      review.length <= OffersRestriction.MAX_REVIEW_LENGTH &&
      rating
    ) {
      onReviewSubmit(id, {comment: review, rating}).then(onFormReset);
    }
  };

  return (
    <form
      className="reviews__form form"
      action="#"
      method="post"
      onSubmit={(evt) => {
        evt.preventDefault();
        handleFormSubmit();
      }}
    >
      <label className="reviews__label form__label" htmlFor="review">
        Your review
      </label>
      <div className="reviews__rating-form form__rating">
        {Array(OffersRestriction.MAX_RATING)
          .fill(``)
          .map((_, i) => ++i)
          .reverse()
          .map((value) => {
            return (
              <React.Fragment key={value + `star`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={value}
                  id={`${value}-stars`}
                  type="radio"
                  onChange={onInputChange}
                  checked={rating === value}
                  disabled={isSending}
                />
                <label
                  htmlFor={`${value}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title="perfect"
                >
                  <svg className="form__star-image" width="37" height="33">
                    <use xlinkHref="#icon-star"></use>
                  </svg>
                </label>
              </React.Fragment>
            );
          })}
      </div>
      {isError && (
        <b className="reviews__label form__label" style={{color: `red`}}>
          Please check your internet connection
        </b>
      )}
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
        value={review}
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onInputChange}
        disabled={isSending}
      ></textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set{` `}
          <span className="reviews__star">rating</span> and describe your stay
          with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!!isSubmitButtonDisabled}
        >
          Submit
        </button>
      </div>
    </form>
  );
};

export default ReviewForm;
