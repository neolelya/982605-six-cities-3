import * as React from 'react';
import * as renderer from 'react-test-renderer';
import Sorting from './sorting';
import {SortType} from '../../consts';
import {doNothing} from '../../tests-mocks';

it(`Should Sorting render correctly`, () => {
  const tree = renderer
    .create(
        <Sorting
          currentSortType={SortType.POPULAR}
          onSortTypeClick={doNothing}
          isActive={false}
          onToggleClick={doNothing}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
