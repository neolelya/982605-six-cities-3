import * as React from 'react';
import * as renderer from 'react-test-renderer';
import ReviewForm from './review-form';
import {REVIEWS, doNothing} from '../../tests-mocks';

it(`Should ReviewForm render correctly`, () => {
  const tree = renderer
    .create(
        <ReviewForm
          id={REVIEWS[0].id}
          onReviewSubmit={() => Promise.resolve()}
          isSending={false}
          isError={false}
          review={REVIEWS[0].comment}
          rating={REVIEWS[0].rating}
          onInputChange={doNothing}
          onFormReset={doNothing}
        />
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
