import React from 'react';
import PropTypes from 'prop-types';
import pluralize from 'pluralize';
import {OffersRestriction} from '../../consts';
import ReviewsItem from '../reviews-item/reviews-item.jsx';
import {reviewsShape} from '../../shape';

const ReviewsList = (props) => {
  const {reviews, children} = props;

  return (
    <section className="property__reviews reviews">
      <h2 className="reviews__title">
        {pluralize(`Review`, reviews.length)} &middot;{` `}
        <span className="reviews__amount">{reviews.length}</span>
      </h2>
      <ul className="reviews__list">
        {reviews
          .slice(0, OffersRestriction.MAX_REVIEWS_QUANTITY)
          .map((review) => {
            return <ReviewsItem key={review.id} review={review} />;
          })
        }
      </ul>
      {children}
    </section>
  );
};

ReviewsList.propTypes = {
  reviews: reviewsShape,
  children: PropTypes.node.isRequired,
};

export default ReviewsList;
