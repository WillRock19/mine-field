import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Mine from './Mine';

describe('Mine', () => {
  it.only('tests should be runned', () => {
    renderer.create(<Mine />);
  });

    //TODO: Implementar um teste de snapshot para verificar se a mina está como esperamos
});
