import React from 'react';
import renderer from 'react-test-renderer';
import Property from './property.jsx';
import {TEST_OFFERS} from '../../mocks/tests-mocks';

const OFFER = TEST_OFFERS[0].offers[0];

it(`Should render Property correctly`, () => {
  const tree = renderer.create(<Property offer={OFFER} />).toJSON();

  expect(tree).toMatchSnapshot();
});
