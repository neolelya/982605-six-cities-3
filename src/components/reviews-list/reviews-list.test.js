import React from 'react';
import renderer from 'react-test-renderer';
import ReviewsList from './reviews-list.jsx';
import {REVIEWS} from '../../tests-mocks';

const ReviewForm = () => {
  return (
    <form action="#" className="reviews__form form" method="post">
      Put all of your personal information here...
    </form>
  );
};

it(`Should render ReviewsList correctly`, () => {
  const tree = renderer
    .create(
        <ReviewsList reviews={REVIEWS}>
          <ReviewForm />
        </ReviewsList>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
