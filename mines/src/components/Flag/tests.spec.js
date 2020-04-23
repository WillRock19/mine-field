import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import Flag from './Flag';

Enzyme.configure({adapter: new Adapter()});

describe('Component Flag', () => {
  it('should be rendered correctly', () => {
    const wrapper = shallow(<Flag />);
    expect(wrapper.exists()).toBeTruthy();
  });

  //TODO: Implementar um teste de snapshot para verificar se a bandeira está como esperamos
});
