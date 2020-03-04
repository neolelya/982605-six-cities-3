import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsItem from './reviews-item.jsx';
import {REVIEWS} from '../../tests-mocks';

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer.create(<ReviewsItem review={REVIEWS[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
