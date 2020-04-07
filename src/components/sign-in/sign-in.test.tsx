import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import SignIn from './sign-in';
import {doNothing} from '../../tests-mocks';

it(`SignIn should render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <SignIn
            onSubmit={doNothing}
            isLoginError={false}
            onUserEmailClick={doNothing}
          />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
