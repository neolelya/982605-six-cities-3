import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import OffersContainer from './offers-container';
import {OFFERS, doNothing} from '../../tests-mocks';
import {ClassName, SortType} from '../../consts';

configure({
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
          onRentalCardHover={doNothing}
          onSortTypeClick={onSortTypeClick}
          onBookmarkClick={doNothing}
          pageClass={ClassName.CITY}
        />
      </MemoryRouter>
  );

  const sortingList = container.find(`.places__option`);

  sortingList.at(3).simulate(`click`);

  expect(onSortTypeClick).toHaveBeenCalledTimes(1);
  expect(onSortTypeClick.mock.calls[0][0]).toBe(SortType.TOP_RATED);
});
