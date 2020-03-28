import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import Header from './header.jsx';

it(`Should Header render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <Header userEmail={`someEmail@mail.su`} onUserEmailClick={() => {}} />
        </MemoryRouter>
    )
    .toJSON();

  expect(tree).toMatchSnapshot();
});
