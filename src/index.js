import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';

const RENTAL_OFFER_COUNT = 4;
const RENTAL_TITLES = [
  `Beautiful & luxurious apartment at great location`,
  `Wood and stone place`,
  `Stylish and cozy place`,
  `Excellent location and free parking`,
];

ReactDOM.render(
    <App rentalOffers={RENTAL_OFFER_COUNT} rentalTitles={RENTAL_TITLES} />,
    document.querySelector(`#root`)
);
