import * as React from 'react';
import {SortType} from '../../consts';

interface Props {
  currentSortType: string;
  onSortTypeClick: (sortType: string) => void;
  isActive: boolean;
  onToggleClick: () => void;
}

const Sorting: React.FC<Props> = (props: Props) => {
  const {currentSortType, onSortTypeClick, isActive, onToggleClick} = props;

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span
        className="places__sorting-type"
        tabIndex={0}
        onClick={onToggleClick}
      >
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"></use>
        </svg>
      </span>
      <ul
        className={`places__options places__options--custom ${
          isActive ? `places__options--opened` : ``
        }`}
        onClick={onToggleClick}
      >
        {Object.values(SortType).map((sortType: string, i) => {
          return (
            <li
              className={`places__option ${
                sortType === currentSortType ? `places__option--active` : ``
              }`}
              tabIndex={0}
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
};

export default Sorting;
