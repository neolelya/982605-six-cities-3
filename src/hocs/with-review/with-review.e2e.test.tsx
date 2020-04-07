import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withReview from './with-review';

configure({
  adapter: new Adapter(),
});

it(`Should add to Component review, rating and input's handlers`, () => {
  const comment = {
    rating: 4.5,
    review: `Nice, cozy, warm big bed apartment`,
  };

  const Component = () => <input />;
  const ComponentWrapped = withReview(Component);

  const wrapper = shallow(<ComponentWrapped />);

  expect(wrapper.props().review).toBe(``);
  expect(wrapper.props().rating).toBe(0);

  wrapper
    .props()
    .onInputChange({target: {name: `review`, value: comment.review}});
  expect(wrapper.props().review).toEqual(comment.review);

  wrapper
    .props()
    .onInputChange({target: {name: `rating`, value: comment.rating}});
  expect(wrapper.props().rating).toEqual(comment.rating);
});
