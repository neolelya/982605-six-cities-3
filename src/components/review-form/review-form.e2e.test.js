import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import ReviewForm from './review-form.jsx';
import {REVIEWS} from '../../tests-mocks';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({
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
          onInputChange={() => {}}
          onFormReset={() => {}}
        />
      </MemoryRouter>
  );

  form.simulate(`submit`, {
    preventDefault: formSentPrevention,
  });

  expect(formSentPrevention).toHaveBeenCalledTimes(1);
  expect(postReview).toHaveBeenCalledTimes(1);
});
