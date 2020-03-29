import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import pluralize from 'pluralize';
import {OffersRestriction, OFFER_TYPES, ClassName} from '../../consts';
import ReviewsList from '../reviews-list/reviews-list.jsx';
import ReviewForm from '../review-form/review-form.jsx';
import Map from '../map/map.jsx';
import Header from '../header/header.jsx';
import OffersList from '../offers-list/offers-list.jsx';
import withReview from '../../hocs/with-review/with-review.jsx';
import {
  getIsError,
  getIsSending,
  getNearbyOffers,
  getReviews,
} from '../../reducer/data/selectors';
import {Operation as DataOperation} from '../../reducer/data/data';

const ReviewFormWrapped = withReview(ReviewForm);

class Property extends PureComponent {
  constructor(props) {
    super(props);

    this._getNearbyOffersCoordinates = this._getNearbyOffersCoordinates.bind(
        this
    );
  }

  _getNearbyOffersCoordinates() {
    const nearestOffers = this.props.nearbyOffers.map(
        (offer) => offer.offers[0]
    );

    return [
      [
        this.props.offer.coordinates.latitude,
        this.props.offer.coordinates.longitude,
      ],
      ...nearestOffers
        .map((offer) => offer.coordinates)
        .map((coordinate) => [coordinate.latitude, coordinate.longitude]),
    ];
  }

  componentDidMount() {
    this.props.loadOfferData(this.props.offer.id);
    window.scrollTo(0, 0);
  }

  componentDidUpdate(prevProps) {
    if (this.props.offer.id !== prevProps.offer.id) {
      window.scrollTo(0, 0);
      this.props.loadOfferData(this.props.offer.id);
    }
  }

  render() {
    const {
      location,
      offer: {
        id,
        rentalHost: {hostName, hostAvatar, isSuper},
        coordinates,
        rentalTitle,
        rentalImages,
        rentalPrice,
        rentalRating,
        rentalType,
        isPremium,
        isBookmark,
        rentalDescription,
        rentalRoomsQuantity,
        rentalMaxGuestsQuantity,
        rentalFeatures,
      },
      onRentalCardHover,
      activeCardCoordinates,
      nearbyOffers,
      reviews,
      userEmail,
      isSending,
      isError,
      postReview,
      onBookmarkClick,
      onUserEmailClick,
    } = this.props;

    const ratingPercent =
      (Math.round(rentalRating) * 100) / OffersRestriction.MAX_RATING;

    const nearestOffers = nearbyOffers.map((offer) => offer.offers[0]);

    const nearestOffersCoordinates = this._getNearbyOffersCoordinates();

    return (
      <div className="page">
        <Header userEmail={userEmail} onUserEmailClick={onUserEmailClick} />

        <main className="page__main page__main--property">
          <section className="property">
            <div className="property__gallery-container container">
              <div className="property__gallery">
                {rentalImages
                  .map((image, i) => {
                    return (
                      <div key={i + image} className="property__image-wrapper">
                        <img
                          className="property__image"
                          src={image}
                          alt="Photo studio"
                        />
                      </div>
                    );
                  })
                  .slice(0, OffersRestriction.MAX_IMAGES_QUANTITY)}
              </div>
            </div>
            <div className="property__container container">
              <div className="property__wrapper">
                {isPremium && (
                  <div className="property__mark">
                    <span>Premium</span>
                  </div>
                )}
                <div className="property__name-wrapper">
                  <h1 className="property__name">{rentalTitle}</h1>
                  <button
                    className={`property__bookmark-button button ${
                      isBookmark ? `property__bookmark-button--active` : ``
                    }`}
                    type="button"
                    onClick={() => {
                      onBookmarkClick(id, isBookmark ? 0 : 1);
                    }}
                  >
                    <svg
                      className="property__bookmark-icon"
                      width="31"
                      height="33"
                    >
                      <use xlinkHref="#icon-bookmark"></use>
                    </svg>
                    <span className="visually-hidden">To bookmarks</span>
                  </button>
                </div>
                <div className="property__rating rating">
                  <div className="property__stars rating__stars">
                    <span style={{width: `${ratingPercent}%`}}></span>
                    <span className="visually-hidden">Rating</span>
                  </div>
                  <span className="property__rating-value rating__value">
                    {rentalRating}
                  </span>
                </div>
                <ul className="property__features">
                  <li className="property__feature property__feature--entire">
                    {rentalType}
                  </li>
                  <li className="property__feature property__feature--bedrooms">
                    {rentalRoomsQuantity}
                    {pluralize(` Bedroom`, rentalRoomsQuantity)}
                  </li>
                  <li className="property__feature property__feature--adults">
                    Max {rentalMaxGuestsQuantity}
                    {` `}
                    {pluralize(` adult`, rentalMaxGuestsQuantity)}
                  </li>
                </ul>
                <div className="property__price">
                  <b className="property__price-value">&euro;{rentalPrice}</b>
                  <span className="property__price-text">&nbsp;night</span>
                </div>
                <div className="property__inside">
                  <h2 className="property__inside-title">What&apos;s inside</h2>
                  <ul className="property__inside-list">
                    {rentalFeatures.map((feature, i) => {
                      return (
                        <li key={i + feature} className="property__inside-item">
                          {feature}
                        </li>
                      );
                    })}
                  </ul>
                </div>
                <div className="property__host">
                  <h2 className="property__host-title">Meet the host</h2>
                  <div className="property__host-user user">
                    <div
                      className={`property__avatar-wrapper user__avatar-wrapper
                    ${isSuper ? `property__avatar-wrapper--pro` : ``}`}
                    >
                      <img
                        className="property__avatar user__avatar"
                        src={hostAvatar}
                        width="74"
                        height="74"
                        alt="Host avatar"
                      />
                    </div>
                    <span className="property__user-name">{hostName}</span>
                  </div>
                  <div className="property__description">
                    {rentalDescription.map((description, i) => {
                      return (
                        <p key={i + description} className="property__text">
                          {description}
                        </p>
                      );
                    })}
                  </div>
                </div>
                {
                  <ReviewsList reviews={reviews}>
                    {userEmail && (
                      <ReviewFormWrapped
                        onReviewSubmit={postReview}
                        id={id}
                        isSending={isSending}
                        isError={isError}
                      />
                    )}
                  </ReviewsList>
                }
              </div>
            </div>
            <section
              className="property__map map"
              style={{width: `80%`, margin: `0 auto 50px auto`}}
            >
              <Map
                location={location}
                offersCoordinates={nearestOffersCoordinates}
                activeCoordinates={[
                  coordinates.latitude,
                  coordinates.longitude,
                ]}
                activeCardCoordinates={activeCardCoordinates}
              />
            </section>
          </section>
          <div className="container">
            <section className="near-places places">
              <h2 className="near-places__title">
                Other places in the neighbourhood
              </h2>
              <div className="near-places__list places__list">
                <OffersList
                  rentalCardsList={nearestOffers}
                  onRentalCardHover={onRentalCardHover}
                  onBookmarkClick={onBookmarkClick}
                  pageClass={ClassName.NEAR_PLACES}
                />
              </div>
            </section>
          </div>
        </main>
      </div>
    );
  }
}

Property.propTypes = {
  offer: PropTypes.shape({
    id: PropTypes.number.isRequired,
    rentalHost: PropTypes.shape({
      hostAvatar: PropTypes.string.isRequired,
      hostName: PropTypes.string.isRequired,
      isSuper: PropTypes.bool.isRequired,
    }).isRequired,
    coordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
    rentalTitle: PropTypes.string.isRequired,
    rentalImages: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
    rentalPrice: PropTypes.number.isRequired,
    rentalRating: PropTypes.number.isRequired,
    rentalType: PropTypes.oneOf(OFFER_TYPES).isRequired,
    isPremium: PropTypes.bool.isRequired,
    isBookmark: PropTypes.bool.isRequired,
    rentalDescription: PropTypes.arrayOf(PropTypes.string.isRequired)
      .isRequired,
    rentalRoomsQuantity: PropTypes.number.isRequired,
    rentalMaxGuestsQuantity: PropTypes.number.isRequired,
    rentalFeatures: PropTypes.array.isRequired,
  }).isRequired,
  location: PropTypes.shape({
    cityCoordinates: PropTypes.shape({
      latitude: PropTypes.number.isRequired,
      longitude: PropTypes.number.isRequired,
      zoom: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        coordinates: PropTypes.shape({
          latitude: PropTypes.number.isRequired,
          longitude: PropTypes.number.isRequired,
          zoom: PropTypes.number.isRequired,
        }).isRequired,
      }).isRequired
  ).isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
  nearbyOffers: PropTypes.array.isRequired,
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
  userEmail: PropTypes.string,
  loadOfferData: PropTypes.func.isRequired,
  postReview: PropTypes.func.isRequired,
  isSending: PropTypes.bool.isRequired,
  isError: PropTypes.bool.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  onUserEmailClick: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  reviews: getReviews(state),
  nearbyOffers: getNearbyOffers(state),
  isSending: getIsSending(state),
  isError: getIsError(state),
});

const mapDispatchToProps = (dispatch) => ({
  loadOfferData(id) {
    dispatch(DataOperation.getReviews(id));
    dispatch(DataOperation.getNearbyOffers(id));
  },
  postReview(id, review) {
    dispatch(DataOperation.postReview(id, review));
    dispatch(DataOperation.getReviews(id));
  },
  onBookmarkClick(id, status) {
    dispatch(DataOperation.changeFavoriteStatus(id, status));
  },
  onUserEmailClick() {
    dispatch(DataOperation.loadFavorites());
  },
});

export {Property};
export default connect(mapStateToProps, mapDispatchToProps)(Property);
