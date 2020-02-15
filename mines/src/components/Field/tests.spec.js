import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import renderer from 'react-test-renderer';

import Field from './Field';

Enzyme.configure({adapter: new Adapter()});

describe('Element Fields', () => {
  it('should be correctly rendered', () => {
    renderer.create(<Field />);
  });

  describe('when rendering with a number', () => {
    it('should not show number if there are no nearMines', () => {
      expect(false).toBe(true);
    });

    it('should not show number if field is mined', () => {
      expect(false).toBe(true);
    });

    it('should not show number if field is not opened', () => {
      expect(false).toBe(true);
    });

    it('should show number for specific nearMines', () => {
      expect(false).toBe(true);
    });
  });

  describe('when rendering with a mine', () => {
    it('should not show mine if field is not open', () => {
      expect(false).toBe(true);
    });

    it('should not show mine if field is not mined', () => {
      expect(false).toBe(true);
    });

    it('should show mine if field has it and is open', () => {
      expect(false).toBe(true);
    });
  });

  describe('when rendering with a flag', () => {
    it('should not show flag if hasFlag is false', () => {
      expect(false).toBe(true);
    });

    it('should not show flag if field is not open', () => {
      expect(false).toBe(true);
    });

    it('should show flag if field has it and is open', () => {
      expect(false).toBe(true);
    });
  });
});
