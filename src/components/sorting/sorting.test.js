import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';

it(`Should Sorting render correctly`, () => {
  const tree = renderer
    .create(
        <Sorting
          currentSortType={`Popular`}
          onSortTypeClick={() => {}}
          isActive={false}
          onToggleClick={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
