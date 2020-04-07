import * as React from 'react';
import OffersList from '../offers-list/offers-list';
import Map from '../map/map';
import Sorting from '../sorting/sorting';
import {getSortedOffers} from '../../utils';
import withToggle from '../../hocs/with-toggle/with-toggle';
import {Coordinate, Offers} from '../../type';

interface Props {
  placesCount: number;
  currentOffers: Offers;
  currentSortType: string;
  onSortTypeClick: (sortType: string) => void;
  onRentalCardHover: (coordinate: Coordinate) => void;
  activeCardCoordinates: number[];
  onBookmarkClick: (id: number, status: boolean) => void;
  pageClass: string;
  userEmail?: string;
}

const SortingWrapped = withToggle(Sorting);

class OffersContainer extends React.PureComponent<Props, {}> {
  private scroll: React.RefObject<HTMLElement>;

  constructor(props) {
    super(props);

    this.scroll = React.createRef();
  }

  componentDidUpdate(prevProps) {
    if (
      this.props.currentOffers !== prevProps.currentOffers &&
      this.props.currentOffers[0].location.city !==
        prevProps.currentOffers[0].location.city
    ) {
      this.scroll.current.scrollTo(0, 0);
    }
  }

  render() {
    const {
      placesCount,
      currentOffers,
      currentSortType,
      onSortTypeClick,
      activeCardCoordinates,
      onRentalCardHover,
      onBookmarkClick,
      pageClass,
      userEmail,
    } = this.props;

    const {location, offers} = currentOffers[0];

    const sortedOffers = getSortedOffers(offers, currentSortType);

    const offersCoordinates = offers.map((offer) => [
      offer.coordinates.latitude,
      offer.coordinates.longitude,
    ]);

    return (
      <div className="cities__places-container container">
        <section className="cities__places places" ref={this.scroll}>
          <h2 className="visually-hidden">Places</h2>
          <b className="places__found">
            {placesCount} places to stay in {location.city}
          </b>
          <SortingWrapped
            currentSortType={currentSortType}
            onSortTypeClick={onSortTypeClick}
          />
          <div className="cities__places-list places__list tabs__content">
            <OffersList
              rentalCardsList={sortedOffers}
              onRentalCardHover={onRentalCardHover}
              onBookmarkClick={onBookmarkClick}
              pageClass={pageClass}
              userEmail={userEmail}
            />
          </div>
        </section>
        <div className="cities__right-section">
          <section className="cities__map map">
            <Map
              location={location}
              offersCoordinates={offersCoordinates}
              activeCardCoordinates={activeCardCoordinates}
            />
          </section>
        </div>
      </div>
    );
  }
}

export default OffersContainer;
