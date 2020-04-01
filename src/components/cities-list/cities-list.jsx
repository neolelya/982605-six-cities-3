import React from 'react';
import PropTypes from 'prop-types';

const CitiesList = (props) => {
  const {cities, currentCity, onCityClick} = props;

  return (
    <ul className="locations__list tabs__list">
      {cities.map((city) => (
        <li key={city} className="locations__item">
          <a
            className={`locations__item-link tabs__item ${
              city === currentCity ? `tabs__item--active` : ``
            }`}
            href="#"
            onClick={(evt) => {
              evt.preventDefault();
              onCityClick(city);
            }}
          >
            <span>{city}</span>
          </a>
        </li>
      ))}
    </ul>
  );
};

CitiesList.propTypes = {
  cities: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
  currentCity: PropTypes.string.isRequired,
  onCityClick: PropTypes.func.isRequired,
};

export default CitiesList;
