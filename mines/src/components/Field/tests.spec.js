import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {shallow} from 'enzyme';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import Flag from '../Flag';
import Field from './Field';
import Mine from '../Mine';

Enzyme.configure({adapter: new Adapter()});

describe('Component Fields', () => {
  it('should be rendered correctly', () => {
    renderer.create(<Field />);
  });

  describe('when rendering with a number', () => {
    const numbersToRender = [1, 2, 3, 4, 5, 6, 7, 8, 10, 20];

    it('should not show number if there are no nearMines', () => {
      const fieldData = {
        nearMines: 0,
        open: true,
        isMined: false,
      };
      let fieldElement = renderer.create(<Field {...fieldData} />);
      let elementWithNumber = fieldElement.root.findAllByType(Text);

      expect(elementWithNumber).toEqual([]);
    });

    it('should not show number if field is mined', () => {
      const fieldData = {
        isMined: true,
        nearMines: 1,
        open: true,
      };
      let fieldElement = renderer.create(<Field {...fieldData} />);
      let elementWithNumber = fieldElement.root.findAllByType(Text);

      expect(elementWithNumber).toEqual([]);
    });

    it('should not show number if field is not opened', () => {
      const fieldData = {
        opened: false,
        isMined: true,
        nearMines: 1,
      };
      let fieldElement = renderer.create(<Field {...fieldData} />);
      let elementWithNumber = fieldElement.root.findAllByType(Text);

      expect(elementWithNumber).toEqual([]);
    });

    numbersToRender.forEach(number => {
      it(`should show number ${number} when it is the amount of nearMines`, () => {
        const fieldData = {
          opened: true,
          isMined: false,
          nearMines: number,
        };
        let fieldElement = renderer.create(<Field {...fieldData} />);
        let elementWithNumber = fieldElement.root.findByType(Text);
        let valueRendered = elementWithNumber.props.children;
  
        expect(valueRendered).toBe(fieldData.nearMines);
      });
    });

  it('should not render a Mine element if it shows a number', () => {
      const fieldData = {
        opened: true,
        isMined: false,
        nearMines: 1,
      };
      let fieldElement = renderer.create(<Field {...fieldData} />);
      let mineElements = fieldElement.root.findAllByType(Mine);

      expect(mineElements.length).toBe(0);
    });

  it('should not render a Flag element if it shows a number', () => {
      const fieldData = {
        opened: true,
        isMined: false,
        nearMines: 1,
      };
      let fieldElement = renderer.create(<Field {...fieldData} />);
      let flagElements = fieldElement.root.findAllByType(Flag);

      expect(flagElements.length).toBe(0);
    });
  });

  describe('when rendering with a mine', () => {
  it('should not show mine if field is not open', () => {
      const fieldData = {
        opened: false,
        isMined: true,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Mine).exists()).toBeFalsy();
    });

  it('should not show mine if field is not mined', () => {
      const fieldData = {
        opened: true,
        isMined: false,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Mine).exists()).toBeFalsy();
    });

  it('should show mine if the field has it and is open', () => {
      const fieldData = {
        opened: true,
        isMined: true,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Mine).exists()).toBeTruthy();
    });

  it('should not render a number if it is showing the mine', () => {
      const fieldData = {
      opened: true,
        isMined: true,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Text).exists()).toBeFalsy();
    });

  it('should not render a flag if it is showing the mine', () => {
      const fieldData = {
        opened: true,
        isMined: true,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Flag).exists()).toBeFalsy();
    });
  });

  describe('when rendering with a flag', () => {
  it('should not show flag if hasFlag is false', () => {
      const fieldData = {
        hasFlag: false,
        opened: false,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Flag).exists()).toBeFalsy();
    });

  it('should not show flag if field is open', () => {
      const fieldData = {
        hasFlag: true,
        opened: true,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Flag).exists()).toBeFalsy();
    });

  it('should show flag only if hasFlag is true and field is not open', () => {
      const fieldData = {
        hasFlag: true,
        opened: false,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Flag).exists()).toBeTruthy();
    });

  it('should not render a number if it is showing a flag', () => {
      const fieldData = {
        hasFlag: true,
        opened: false,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Text).exists()).toBeFalsy();
    });

  it('should not render a mine if it is showing a flag', () => {
      const fieldData = {
        hasFlag: true,
        opened: false,
      };
      let fieldElement = shallow(<Field {...fieldData} />);
      expect(fieldElement.find(Mine).exists()).toBeFalsy();
    });
  });
});
