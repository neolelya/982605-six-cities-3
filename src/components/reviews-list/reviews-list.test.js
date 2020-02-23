import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list.jsx';
import {TEST_REVIEWS} from '../../tests-mocks';

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer.create(<ReviewsList reviews={TEST_REVIEWS} />).toJSON();

  expect(tree).toMatchSnapshot();
});
