import React from 'react';
import Enzyme, {shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import withReview from './with-review.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should add to Component review, rating and input's handlers`, () => {
  const Component = () => <form />;
  const ComponentWrapped = withReview(Component);

  const wrapper = shallow(<ComponentWrapped />);

  expect(wrapper.props().review).toBe(``);
  expect(wrapper.props().rating).toBe(0);
  expect(wrapper.props().onInputChange).toBeInstanceOf(Function);
  expect(wrapper.props().onFormReset).toBeInstanceOf(Function);
});
