import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewsList from './reviews-list';
import {REVIEWS} from '../../tests-mocks';

const ReviewForm = () => {
  return (
    <form action="#" className="reviews__form form" method="post">
      Put all of your personal information here...
    </form>
  );
};

it(`Should render ReviewsList correctly with reviews`, () => {
  const tree = renderer
    .create(
        <ReviewsList reviews={REVIEWS}>
          <ReviewForm />
        </ReviewsList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should render ReviewsList correctly without reviews`, () => {
  const tree = renderer
    .create(
        <ReviewsList reviews={[]}>
          <ReviewForm />
        </ReviewsList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
