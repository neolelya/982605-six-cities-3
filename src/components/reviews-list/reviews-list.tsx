import * as React from 'react';
import * as pluralize from 'pluralize';
import {OffersRestriction} from '../../consts';
import ReviewsItem from '../reviews-item/reviews-item';
import {Reviews} from '../../type';

interface Props {
  reviews: Reviews;
  children: React.ReactNode;
}

const ReviewsList: React.FC<Props> = (props: Props) => {
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
          })}
      </ul>
      {children}
    </section>
  );
};

export default ReviewsList;
