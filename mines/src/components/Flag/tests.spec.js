import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow, mount} from 'enzyme';
import Flag from './Flag';

Enzyme.configure({adapter: new Adapter()});

describe('Component Flag', () => {
  it('should be rendered correctly', () => {
    const wrapper = shallow(<Flag />);
    expect(wrapper.exists()).toBeTruthy();
  });

  it.only('should have expected structure and styling', () => {
    const wrapper = mount(<Flag />);
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
