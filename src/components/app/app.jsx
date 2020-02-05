import React from 'react';
import Main from '../main/main.jsx';

const App = (props) => {
  // eslint-disable-next-line react/prop-types
  const {rentalOffers} = props;

  return (
    <Main rentalOffers={rentalOffers} />
  );
};

export default App;
