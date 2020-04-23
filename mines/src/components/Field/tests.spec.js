import 'jsdom-global/register';
import 'react-native';
import React from 'react';
import Adapter from 'enzyme-adapter-react-16';
import Enzyme, {mount} from 'enzyme';
import renderer from 'react-test-renderer';
import { Text } from 'react-native';

import Field from './Field';

Enzyme.configure({adapter: new Adapter()});

describe('Element Fields', () => {
  it('should be correctly rendered', () => {
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
    })
  });

  // describe('when rendering with a mine', () => {
  //   it('should not show mine if field is not open', () => {
  //     expect(false).toBe(true);
  //   });

  //   it('should not show mine if field is not mined', () => {
  //     expect(false).toBe(true);
  //   });

  //   it('should show mine if field has it and is open', () => {
  //     expect(false).toBe(true);
  //   });
  // });

  // describe('when rendering with a flag', () => {
  //   it('should not show flag if hasFlag is false', () => {
  //     expect(false).toBe(true);
  //   });

  //   it('should not show flag if field is not open', () => {
  //     expect(false).toBe(true);
  //   });

  //   it('should show flag if field has it and is open', () => {
  //     expect(false).toBe(true);
  //   });
  // });
});
