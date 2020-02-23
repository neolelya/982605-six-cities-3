import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsItem from './reviews-item.jsx';
import {TEST_REVIEWS} from '../../tests-mocks';

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer
    .create(<ReviewsItem review={TEST_REVIEWS[0]} />)
    .toJSON();

  expect(tree).toMatchSnapshot();
});
