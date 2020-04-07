import * as React from 'react';
import {configure, mount} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import Sorting from './sorting';
import {SortType} from '../../consts';
import {doNothing} from '../../tests-mocks';

configure({
  adapter: new Adapter(),
});

const currentSortType = SortType.POPULAR;

it(`Should sorting element be clicked`, () => {
  const onSortTypeClick = jest.fn();

  const sorting = mount(
      <Sorting
        currentSortType={currentSortType}
        onSortTypeClick={onSortTypeClick}
        isActive={false}
        onToggleClick={doNothing}
      />
  );

  sorting
    .find(`.places__option`)
    .at(2)
    .simulate(`click`);

  expect(onSortTypeClick).toHaveBeenCalledTimes(1);
});

it(`Should change active sorting item`, () => {
  const onSortTypeClick = jest.fn();

  const sorting = mount(
      <Sorting
        currentSortType={currentSortType}
        onSortTypeClick={onSortTypeClick}
        isActive={false}
        onToggleClick={doNothing}
      />
  );

  const sortingList = sorting.find(`.places__option`);

  sortingList.at(3).simulate(`click`);

  expect(onSortTypeClick.mock.calls[0][0]).toBe(SortType.TOP_RATED);
  expect(onSortTypeClick.mock.calls[0][0]).not.toMatch(currentSortType);
});
