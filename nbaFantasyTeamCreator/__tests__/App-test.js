/**
 * @format
 */

import 'react-native';
import React from 'react';
import App from '../App';

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<App />);
});

test('matches snapshot', () => {
  const app = renderer.create(<App />).toJSON();
  expect(app).toMatchSnapshot();
});

describe('Open avaliable players list', () => {
  test('no team or city created', () => {
    const teamName = '';
    const cityName = '';
    var setPlayersVisible = false;
    teamName && cityName
      ? (setPlayersVisible = true)
      : console.log('Please choose team city and name first');
    expect(setPlayersVisible).toEqual(false);
  });
});
