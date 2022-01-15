import 'react-native';
import React from 'react';
import RosterList from '../components/RosterList';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<RosterList />);
});

test('matches snapshot', () => {
  const rosterList = renderer.create(<RosterList />).toJSON();
  expect(rosterList).toMatchSnapshot();
});
