import React from 'react';
import renderer from 'react-test-renderer';
import {MemoryRouter} from 'react-router-dom';
import PrivateRoute from './private-route.jsx';
import {AuthorizationStatus} from '../../consts';

it(`Should PrivateRoute render correctly`, () => {
  const tree = renderer
    .create(
        <MemoryRouter>
          <PrivateRoute
            authorizationStatus={AuthorizationStatus.AUTHORIZED}
            path="/"
            render={() => <div>Private Component</div>}
          />
        </MemoryRouter>
    ).toJSON();

  expect(tree).toMatchSnapshot();
});
