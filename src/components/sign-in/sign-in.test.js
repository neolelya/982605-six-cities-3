import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import SignIn from './sign-in.jsx';

it(`SignIn should render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn onSubmit={() => {}} isLoginError={false} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
