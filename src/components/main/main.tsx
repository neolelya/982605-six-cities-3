import * as React from 'react';
import Header from '../header/header';
import CitiesList from '../cities-list/cities-list';
import OffersContainer from '../offers-container/offers-container';
import NoOffers from '../no-offers/no-offers';
import {ClassName} from '../../consts';
import {Coordinate, Offers} from '../../type';

interface Props {
  cities: string[];
  currentCity: string;
  currentOffers: Offers;
  onCityClick: (city: string) => void;
  currentSortType: string;
  onSortTypeClick: (sortType: string) => void;
  onRentalCardHover: (coordinate: Coordinate) => void;
  activeCardCoordinates: number[];
  isError: boolean;
  userEmail?: string;
  onBookmarkClick: (id: number, status: boolean) => void;
  onUserEmailClick: () => void;
}

const Main: React.FC<Props> = (props: Props) => {
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
              userEmail={userEmail}
            />
          ) : (
            <NoOffers currentCity={currentCity} isError={isError} />
          )}
        </div>
      </main>
    </div>
  );
};

export default Main;
