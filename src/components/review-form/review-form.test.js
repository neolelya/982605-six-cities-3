import React from 'react';
import renderer from 'react-test-renderer';
import ReviewForm from './review-form.jsx';
import {REVIEWS} from '../../tests-mocks';

it(`Should ReviewForm render correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          id={REVIEWS[0].id}
          onReviewSubmit={() => {}}
          isSending={false}
          isError={false}
          review={REVIEWS[0].comment}
          rating={REVIEWS[0].rating}
          onInputChange={() => {}}
          onFormReset={() => {}}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
