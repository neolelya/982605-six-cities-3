import React, {PureComponent, createRef} from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import Sorting from '../sorting/sorting.jsx';
import {getSortedOffers} from '../../utils';
import withToggle from '../../hocs/with-toggle/with-toggle.jsx';

const SortingWrapped = withToggle(Sorting);

class OffersContainer extends PureComponent {
  constructor(props) {
    super(props);

    this._scroll = createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentOffers !== prevProps.currentOffers &&
      this.props.currentOffers[0].location.city !==
        prevProps.currentOffers[0].location.city
    ) {
      this._scroll.current.scrollTo(0, 0);
    }
  }

  render() {
    const {
      placesCount,
      currentOffers,
      currentSortType,
      onSortTypeClick,
      activeCardCoordinates,
      onRentalCardHover,
      onBookmarkClick,
      pageClass,
    } = this.props;

    const {location, offers} = currentOffers[0];

    const sortedOffers = getSortedOffers(offers, currentSortType);

    const offersCoordinates = offers.map((offer) => [
      offer.coordinates.latitude,
      offer.coordinates.longitude,
    ]);

    return (
      <div className="cities__places-container container">
        <section className="cities__places places" ref={this._scroll}>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {placesCount} places to stay in {location.city}
          </b>
          <SortingWrapped
            currentSortType={currentSortType}
            onSortTypeClick={onSortTypeClick}
          />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              rentalCardsList={sortedOffers}
              onRentalCardHover={onRentalCardHover}
              onBookmarkClick={onBookmarkClick}
              pageClass={pageClass}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              location={location}
              offersCoordinates={offersCoordinates}
              activeCardCoordinates={activeCardCoordinates}
            />
          </section>
        </div>
      </div>
    );
  }
}

OffersContainer.propTypes = {
  placesCount: PropTypes.number.isRequired,
  currentOffers: PropTypes.array.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  pageClass: PropTypes.string.isRequired,
};

export default OffersContainer;
