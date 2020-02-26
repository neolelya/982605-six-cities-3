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
      <React.Fragment>
        {this.props.rentalCardsList.map(
            ({
              id,
              rentalTitle,
              rentalImages,
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
                    rentalImages={rentalImages}
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
      </React.Fragment>
    );
  }
}

OffersList.propTypes = {
  rentalCardsList: PropTypes.array.isRequired,
  onHeaderClick: PropTypes.func.isRequired,
};

export default OffersList;
