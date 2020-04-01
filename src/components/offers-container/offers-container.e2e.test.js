import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import OffersContainer from './offers-container.jsx';
import {OFFERS} from '../../tests-mocks';
import {ClassName, SortType} from '../../consts';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`OffersContainer's sorting works correctly`, () => {
  const onSortTypeClick = jest.fn();

  const container = mount(
      <MemoryRouter>
        <OffersContainer
          placesCount={OFFERS[0].offers.length}
          currentOffers={OFFERS}
          activeCardCoordinates={[]}
          currentSortType={SortType.POPULAR}
          onRentalCardHover={() => {}}
          onSortTypeClick={onSortTypeClick}
          onBookmarkClick={() => {}}
          pageClass={ClassName.CITY}
        />
      </MemoryRouter>
  );

  const sortingList = container.find(`.places__option`);

  sortingList.at(3).simulate(`click`);

  expect(onSortTypeClick).toHaveBeenCalledTimes(1);
  expect(onSortTypeClick.mock.calls[0][0]).toBe(SortType.TOP_RATED);
});
