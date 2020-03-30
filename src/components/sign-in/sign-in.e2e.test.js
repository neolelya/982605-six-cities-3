import React from 'react';
import Enzyme, {mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import SignIn from './sign-in.jsx';

Enzyme.configure({
  adapter: new Adapter(),
});

it(`Should handle submit event`, () => {
  const onSubmit = jest.fn();
  const formSentPrevention = jest.fn();

  const signInPage = mount(
      <MemoryRouter>
        <SignIn
          onSubmit={onSubmit}
          isLoginError={false}
          onUserEmailClick={() => {}}
        />
      </MemoryRouter>
  );

  const form = signInPage.find(`.login__form`);
  form.simulate(`submit`, {
    preventDefault: formSentPrevention,
  });

  expect(onSubmit).toHaveBeenCalledTimes(1);
  expect(formSentPrevention).toHaveBeenCalledTimes(1);
});
