import React from 'react';
import renderer from 'react-test-renderer';
import Sorting from './sorting.jsx';

it(`Should Sorting render correctly`, () => {
  const tree = renderer
    .create(<Sorting currentSortType={`Popular`} onSortTypeClick={() => {}} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
