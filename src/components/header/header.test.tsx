import * as React from 'react';
import * as renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Header from './header';
import {USER_EMAIL, doNothing} from '../../tests-mocks';

it(`Should Header render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header userEmail={USER_EMAIL} onUserEmailClick={doNothing} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Header render correctly with unauthorized user`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header userEmail={``} onUserEmailClick={doNothing} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
