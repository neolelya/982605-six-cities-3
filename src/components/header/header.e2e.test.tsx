import * as React from 'react';
import {configure, mount} from 'enzyme';
import {MemoryRouter} from 'react-router-dom';
import * as Adapter from 'enzyme-adapter-react-16';
import Header from './header';
import {USER_EMAIL} from '../../tests-mocks';

configure({
  adapter: new Adapter(),
});

it(`Header's onUserEmail click work properly`, () => {
  const onUserEmailClick = jest.fn();

  const header = mount(
      <MemoryRouter>
        <Header
          onUserEmailClick={onUserEmailClick}
          userEmail={USER_EMAIL}
        />
      </MemoryRouter>
  );

  const userEmail = header.find(`.header__user-name`);

  userEmail.simulate(`click`);

  expect(onUserEmailClick).toHaveBeenCalledTimes(1);
});
