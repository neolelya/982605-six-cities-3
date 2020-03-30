import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersContainer from '../offers-container/offers-container.jsx';
import NoOffers from '../no-offers/no-offers.jsx';
import {ClassName} from '../../consts';

const Main = (props) => {
  const {
    cities,
    currentCity,
    currentOffers,
    onCityClick,
    currentSortType,
    onSortTypeClick,
    activeCardCoordinates,
    onRentalCardHover,
    isError,
    userEmail,
    onBookmarkClick,
    onUserEmailClick,
  } = props;

  const placesCount =
    currentOffers.length > 0 ? currentOffers[0].offers.length : 0;

  return (
    <div className="page page--gray page--main">
      <Header userEmail={userEmail} onUserEmailClick={onUserEmailClick} />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <div className="tabs">
          <section className="locations container">
            <CitiesList
              cities={cities}
              currentCity={currentCity}
              onCityClick={onCityClick}
            />
          </section>
        </div>
        <div className="cities">
          {placesCount > 0 ? (
            <OffersContainer
              currentOffers={currentOffers}
              placesCount={placesCount}
              currentSortType={currentSortType}
              onSortTypeClick={onSortTypeClick}
              activeCardCoordinates={activeCardCoordinates}
              onRentalCardHover={onRentalCardHover}
              onBookmarkClick={onBookmarkClick}
              pageClass={ClassName.CITY}
            />
          ) : (
            <NoOffers currentCity={currentCity} isError={isError} />
          )}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentOffers: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  activeCardCoordinates: PropTypes.arrayOf(PropTypes.number.isRequired)
    .isRequired,
  isError: PropTypes.bool.isRequired,
  userEmail: PropTypes.string,
  onBookmarkClick: PropTypes.func.isRequired,
  onUserEmailClick: PropTypes.func.isRequired,
};

export default Main;
