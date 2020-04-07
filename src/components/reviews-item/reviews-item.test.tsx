import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewsItem from './reviews-item';
import {REVIEWS} from '../../tests-mocks';

it(`Should render ReviewsItem correctly`, () => {
  const tree = renderer.create(<ReviewsItem review={REVIEWS[0]} />).toJSON();

  expect(tree).toMatchSnapshot();
});
