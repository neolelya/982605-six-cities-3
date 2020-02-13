import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app.jsx';
import offers from './mocks/offers';

const handleHeaderClick = () => {};

ReactDOM.render(
    <App
      rentalOfferCount={offers.length}
      rentalOffers={offers}
      onHeaderClick={handleHeaderClick}
    />,
    document.querySelector(`#root`)
);
