import 'react-native';
import React from 'react';
import Enzyme, {mount, shallow} from 'enzyme';
import PlayerList from '../components/PlayerList';
import App from '../App';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

Enzyme.configure({adapter: new Adapter()});

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  renderer.create(<PlayerList />);
});

test('matches snapshot', () => {
  const playerList = renderer.create(<PlayerList />).toJSON();
  expect(playerList).toMatchSnapshot();
});

test('firstName Text component exists', () => {
  const wrapper = shallow(<PlayerList />);
  expect(
    wrapper.findWhere(node => node.prop('testID') === 'firstName'),
  ).toExist();
});

test('firstName prop exist', () => {
  const wrapper = shallow(<App />);
  expect(wrapper.findWhere(node => node.prop('firstName'))).toExist();
});
