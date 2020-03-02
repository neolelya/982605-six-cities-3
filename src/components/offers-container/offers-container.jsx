import React from 'react';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import Map from '../map/map.jsx';

const OffersContainer = (props) => {
  const {placesCount, currentOffers, onHeaderClick} = props;

  const {location, offers} = currentOffers[0];

  const offersCoordinates = offers.map((offer) => offer.coordinates);

  return (
    <div className="cities__places-container container">
      <section className="cities__places places">
        <h2 className="visually-hidden">Places</h2>
        <b className="places__found">
          {placesCount} places to stay in Amsterdam
        </b>
        <form className="places__sorting" action="#" method="get">
          <span className="places__sorting-caption">Sort by</span>
          <span className="places__sorting-type" tabIndex="0">
            Popular
            <svg className="places__sorting-arrow" width="7" height="4">
              <use xlinkHref="#icon-arrow-select"></use>
            </svg>
          </span>
          <ul className="places__options places__options--custom places__options--opened">
            <li className="places__option places__option--active" tabIndex="0">
              Popular
            </li>
            <li className="places__option" tabIndex="0">
              Price: low to high
            </li>
            <li className="places__option" tabIndex="0">
              Price: high to low
            </li>
            <li className="places__option" tabIndex="0">
              Top rated first
            </li>
          </ul>
        </form>
        <div className="cities__places-list places__list tabs__content">
          <OffersList rentalCardsList={offers} onHeaderClick={onHeaderClick} />
        </div>
      </section>
      <div className="cities__right-section">
        <section className="cities__map map">
          <Map location={location} offersCoordinates={offersCoordinates} />
        </section>
      </div>
    </div>
  );
};

OffersContainer.propTypes = {
  placesCount: PropTypes.number.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
  currentOffers: PropTypes.array.isRequired,
};

export default OffersContainer;
