import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Header from './header.jsx';
import {USER_EMAIL} from '../../tests-mocks';

it(`Should Header render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header userEmail={USER_EMAIL} onUserEmailClick={() => {}} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});

it(`Should Header render correctly with unauthorized user`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header userEmail={``} onUserEmailClick={() => {}} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
