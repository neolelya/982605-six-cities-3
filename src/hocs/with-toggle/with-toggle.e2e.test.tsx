import * as React from 'react';
import {configure, shallow} from 'enzyme';
import * as Adapter from 'enzyme-adapter-react-16';
import withToggle from './with-toggle';

configure({
  adapter: new Adapter(),
});

it(`Should change Component's isActive flag with the HOC's toggler`, () => {
  const Component = () => <span />;
  const ComponentWrapped = withToggle(Component);

  const wrapper = shallow(<ComponentWrapped />);
  expect(wrapper.props().isActive).toBe(false);
  wrapper.props().onToggleClick();
  expect(wrapper.props().isActive).toBe(true);
});
