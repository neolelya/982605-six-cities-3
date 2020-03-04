import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../consts';

class Sorting extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      isOpened: false,
    };

    this._handleSortClick = this._handleSortClick.bind(this);
  }

  _handleSortClick() {
    this.setState({
      isOpened: !this.state.isOpened,
    });
  }

  render() {
    const {currentSortType, onSortTypeClick} = this.props;
    const {isOpened} = this.state;

    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span
          className="places__sorting-type"
          tabIndex="0"
          onClick={this._handleSortClick}
        >
          {currentSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"></use>
          </svg>
        </span>
        <ul
          className={`places__options places__options--custom ${
            isOpened ? `places__options--opened` : ``
          }`}
          onClick={this._handleSortClick}
        >
          {Object.values(SortType).map((sortType, i) => {
            return (
              <li
                className={`places__option ${
                  sortType === currentSortType ? `places__option--active` : ``
                }`}
                tabIndex="0"
                key={i + sortType}
                onClick={() => {
                  onSortTypeClick(sortType);
                }}
              >
                {sortType}
              </li>
            );
          })}
        </ul>
      </form>
    );
  }
}

Sorting.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
};

export default Sorting;
