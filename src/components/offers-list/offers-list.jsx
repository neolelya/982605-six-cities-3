import React from 'react';
import PropTypes from 'prop-types';
import RentalCard from '../rental-card/rental-card.jsx';

const OffersList = (props) => {
  const {rentalCardsList, onRentalCardHover, onBookmarkClick} = props;

  return (
    <React.Fragment>
      {rentalCardsList.map(
          ({
            id,
            rentalTitle,
            rentalImages,
            rentalPrice,
            rentalRating,
            rentalType,
            isPremium,
            isBookmark,
            coordinates,
          }) => {
            return (
              <React.Fragment key={id}>
                <RentalCard
                  id={id}
                  rentalTitle={rentalTitle}
                  rentalImages={rentalImages}
                  rentalPrice={rentalPrice}
                  rentalRating={rentalRating}
                  rentalType={rentalType}
                  isPremium={isPremium}
                  isBookmark={isBookmark}
                  coordinates={coordinates}
                  onRentalCardHover={onRentalCardHover}
                  onBookmarkClick={onBookmarkClick}
                />
              </React.Fragment>
            );
          }
      )}
    </React.Fragment>
  );
};

OffersList.propTypes = {
  rentalCardsList: PropTypes.array.isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
};

export default OffersList;
