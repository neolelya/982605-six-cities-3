import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';
import {SortType} from '../../consts';

it(`Should Sorting render correctly`, () => {
  const tree = renderer
    .create(
        <Sorting
          currentSortType={SortType.POPULAR}
          onSortTypeClick={() => {}}
          isActive={false}
          onToggleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
