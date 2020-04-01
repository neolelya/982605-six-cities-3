import React from 'react';
import PropTypes from 'prop-types';
import RentalCard from '../rental-card/rental-card.jsx';
import {offerShape} from '../../shape';

const OffersList = (props) => {
  const {
    rentalCardsList,
    onRentalCardHover,
    onBookmarkClick,
    pageClass,
  } = props;

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
                  pageClass={pageClass}
                />
              </React.Fragment>
            );
          }
      )}
    </React.Fragment>
  );
};

OffersList.propTypes = {
  rentalCardsList: PropTypes.arrayOf(offerShape).isRequired,
  onRentalCardHover: PropTypes.func.isRequired,
  onBookmarkClick: PropTypes.func.isRequired,
  pageClass: PropTypes.string.isRequired,
};

export default OffersList;
