import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header.jsx';
import CitiesList from '../cities-list/cities-list.jsx';
import OffersContainer from '../offers-container/offers-container.jsx';
import NoOffers from '../no-offers/no-offers.jsx';

const Main = (props) => {
  const {
    cities,
    currentCity,
    currentOffers,
    onHeaderClick,
    onCityClick,
  } = props;

  return (
    <div className="page page--gray page--main">
      <Header />

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
          {currentOffers[0].offers.length > 0 ? (
            <OffersContainer
              currentOffers={currentOffers}
              onHeaderClick={onHeaderClick}
              placesCount={currentOffers[0].offers.length}
            />
          ) : (
            <NoOffers />
          )}
        </div>
      </main>
    </div>
  );
};

Main.propTypes = {
  onHeaderClick: PropTypes.func.isRequired,
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  currentOffers: PropTypes.array.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default Main;
