import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import renderer from 'react-test-renderer';
import Mine from './Mine';

describe('Mine', () => {
  it('tests should be runned', () => {
    renderer.create(<Mine />);
  });

  it('should have the expected structure and style', () => {
    let snapshotTree = renderer.create(<Mine />).toJSON();
    expect(snapshotTree).toMatchSnapshot();
  });
});
