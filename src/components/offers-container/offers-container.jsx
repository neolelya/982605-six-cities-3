import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';
import Sorting from '../sorting/sorting.jsx';
import {getSortedOffers} from '../../utils';

const OffersContainer = (props) => {
  const {
    placesCount,
    currentOffers,
    onHeaderClick,
    currentSortType,
    onSortTypeClick,
    activeCardCoordinates,
    onRentalCardHover,
  } = props;

  const {location, offers} = currentOffers[0];

  const sortedOffers = getSortedOffers(offers, currentSortType);

  const offersCoordinates = offers.map((offer) => offer.coordinates);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {placesCount} places to stay in Amsterdam
        </b>
        <Sorting
          currentSortType={currentSortType}
          onSortTypeClick={onSortTypeClick}
        />
        <div className="cities__places-list places__list tabs__content">
          <OffersList
            rentalCardsList={sortedOffers}
            onHeaderClick={onHeaderClick}
            onRentalCardHover={onRentalCardHover}
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
};

OffersContainer.propTypes = {
  placesCount: PropTypes.number.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  currentOffers: PropTypes.array.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
};

export default OffersContainer;
