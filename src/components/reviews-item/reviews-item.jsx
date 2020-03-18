import React from 'react';
import PropTypes from 'prop-types';
import {OffersRestriction} from '../../consts';
import {formatDate, formatDateTime} from '../../utils';

const ReviewsItem = (props) => {
  const {review} = props;
  const {
    user: {name, avatar},
    rating,
    comment,
    date,
  } = review;

  const ratingPercent =
    (Math.round(rating) * 100) / OffersRestriction.MAX_RATING;

  return (
    <li className="reviews__item">
      <div className="reviews__user user">
        <div className="reviews__avatar-wrapper user__avatar-wrapper">
          <img
            className="reviews__avatar user__avatar"
            src={avatar}
            width="54"
            height="54"
            alt="Reviews avatar"
          />
        </div>
        <span className="reviews__user-name">{name}</span>
      </div>
      <div className="reviews__info">
        <div className="reviews__rating rating">
          <div className="reviews__stars rating__stars">
            <span style={{width: `${ratingPercent}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <p className="reviews__text">{comment}</p>
        <time className="reviews__time" dateTime={formatDateTime(date)}>
          {formatDate(date)}
        </time>
      </div>
    </li>
  );
};

ReviewsItem.propTypes = {
  review: PropTypes.shape({
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
  }).isRequired,
};

export default ReviewsItem;
