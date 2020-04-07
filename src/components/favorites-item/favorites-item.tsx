import * as React from 'react';
import {Link} from 'react-router-dom';
import OffersList from '../offers-list/offers-list';
import {AppRoute, ClassName} from '../../consts';
import {Coordinate, Offer} from '../../type';

interface Props {
  favoriteCity: string;
  favoriteOffers: Array<Offer>;
  onBookmarkClick: (id: number, stats: boolean) => void;
  onRentalCardHover: (coordinate: Coordinate) => void;
  userEmail?: string;
}

const FavoritesItem: React.FC<Props> = ({
  favoriteCity,
  favoriteOffers,
  onBookmarkClick,
  onRentalCardHover,
  userEmail,
}: Props) => {
  return (
    <li className="favorites__locations-items">
      <div className="favorites__locations locations locations--current">
        <div className="locations__item">
          <Link to={AppRoute.ROOT} className="locations__item-link">
            <span>{favoriteCity}</span>
          </Link>
        </div>
      </div>
      <div className="favorites__places">
        <OffersList
          rentalCardsList={favoriteOffers}
          onRentalCardHover={onRentalCardHover}
          onBookmarkClick={onBookmarkClick}
          pageClass={ClassName.FAVORITES}
          userEmail={userEmail}
        />
      </div>
    </li>
  );
};

export default FavoritesItem;
