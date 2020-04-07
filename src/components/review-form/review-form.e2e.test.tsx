import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import ReviewForm from './review-form';
import {REVIEWS, doNothing} from '../../tests-mocks';
import * as Adapter from 'enzyme-adapter-react-16';

configure({
  adapter: new Adapter(),
});

it(`Should ReviewForm calls a reviewPost callback by authorized user`, () => {
  const postReview = jest.fn().mockResolvedValue(Promise.resolve);
  const formSentPrevention = jest.fn();

  const form = mount(
      <MemoryRouter>
        <ReviewForm
          id={REVIEWS[0].id}
          onReviewSubmit={postReview}
          isSending={false}
          isError={false}
          review={REVIEWS[0].comment}
          rating={REVIEWS[0].rating}
          onInputChange={doNothing}
          onFormReset={doNothing}
        />
      </MemoryRouter>
  );

  form.simulate(`submit`, {
    preventDefault: formSentPrevention,
  });

  expect(formSentPrevention).toHaveBeenCalledTimes(1);
  expect(postReview).toHaveBeenCalledTimes(1);
});
