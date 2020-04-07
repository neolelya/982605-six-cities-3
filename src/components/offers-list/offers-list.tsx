import * as React from 'react';
import RentalCard from '../rental-card/rental-card';
import {Coordinate, OfferShape} from '../../shape';

interface Props {
  rentalCardsList: Array<OfferShape>;
  onRentalCardHover: (coordinate: Coordinate) => void;
  onBookmarkClick: (id: number, status: boolean) => void;
  pageClass: string;
  userEmail?: string;
}

const OffersList: React.FC<Props> = (props: Props) => {
  const {
    rentalCardsList,
    onRentalCardHover,
    onBookmarkClick,
    pageClass,
    userEmail,
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
                  userEmail={userEmail}
                />
              </React.Fragment>
            );
          }
      )}
    </React.Fragment>
  );
};

export default OffersList;
