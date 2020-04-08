import * as React from 'react';

interface Props {
  cities: string[];
  currentCity: string;
  onCityClick: (city: string) => void;
}

const CitiesList: React.FC<Props> = (props: Props) => {
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

export default CitiesList;
