import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import SignIn from './sign-in';
import {doNothing} from '../../tests-mocks';

configure({
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
          onUserEmailClick={doNothing}
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
