import React, {Fragment} from 'react';
import PropTypes from 'prop-types';
import {OffersRestriction} from '../../consts';
import ReviewsItem from '../reviews-item/reviews-item.jsx';

const ReviewsList = (props) => {
  const {reviews} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        Reviews &middot;{` `}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .slice()
          .sort((a, b) => b.date - a.date)
          .map((review) => {
            return <ReviewsItem key={review.id} review={review} />;
          })
          .slice(0, OffersRestriction.MAX_REVIEWS_QUANTITY)}
      </ul>
      <form className="reviews__form form" action="#" method="post">
        <label className="reviews__label form__label" htmlFor="review">
          Your review
        </label>
        <div className="reviews__rating-form form__rating">
          {Array(OffersRestriction.MAX_RATING)
            .fill(``)
            .map((_, i) => (
              <Fragment key={i + `star`}>
                <input
                  className="form__rating-input visually-hidden"
                  name="rating"
                  value={i + 1}
                  id={`${i + 1}-stars`}
                  type="radio"
                />
                <label
                  htmlFor={`${i + 1}-stars`}
                  className="reviews__rating-label form__rating-label"
                  title="perfect"
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
          placeholder="Tell how was your stay, what you like and what can be improved"
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
            disabled=""
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        user: PropTypes.shape({
          id: PropTypes.number.isRequired,
          name: PropTypes.string.isRequired,
          isPro: PropTypes.bool.isRequired,
          avatar: PropTypes.string.isRequired,
        }).isRequired,
        rating: PropTypes.number.isRequired,
        date: PropTypes.object.isRequired,
        comment: PropTypes.string.isRequired,
      }).isRequired
  ).isRequired,
};

export default ReviewsList;
