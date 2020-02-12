import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import RentalCard from '../rental-card/rental-card.jsx';

class OffersList extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeRentalCard: null,
    };

    this._setActiveRentalCard = this._setActiveRentalCard.bind(this);
    this._removeActiveRentalCard = this._removeActiveRentalCard.bind(this);
  }

  _setActiveRentalCard(id) {
    this.setState({activeRentalCard: id});
  }

  _removeActiveRentalCard() {
    this.setState({activeRentalCard: null});
  }

  render() {
    return (
      <div className="cities__places-list places__list tabs__content">
        {this.props.rentalCardsList.map(
            ({
              id,
              rentalTitle,
              rentalImage,
              rentalPrice,
              rentalRating,
              rentalType,
              isPremium,
              isBookmark,
            }) => {
              return (
                <React.Fragment key={id}>
                  <RentalCard
                    id={id}
                    rentalTitle={rentalTitle}
                    rentalImage={rentalImage}
                    rentalPrice={rentalPrice}
                    rentalRating={rentalRating}
                    rentalType={rentalType}
                    isPremium={isPremium}
                    isBookmark={isBookmark}
                    onHeaderClick={this.props.onHeaderClick}
                    onMouseEnter={this._setActiveRentalCard}
                    onMouseLeave={this._removeActiveRentalCard}
                  />
                </React.Fragment>
              );
            }
        )}
      </div>
    );
  }
}

OffersList.propTypes = {
  rentalCardsList: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.number.isRequired,
        rentalTitle: PropTypes.string.isRequired,
        rentalImage: PropTypes.string.isRequired,
        rentalPrice: PropTypes.number.isRequired,
        rentalRating: PropTypes.string,
        rentalType: PropTypes.string.isRequired,
        isPremium: PropTypes.bool.isRequired,
        isBookmark: PropTypes.bool,
      })
  ).isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

export default OffersList;
