import React from 'react';
import { shallow } from 'enzyme';
import BarWrapper from './BarWrapper';

it('renders without crashing', () => {
  shallow(
    <BarWrapper
      activeBarIndex={1}
      barValues={[10, 20, 30]}
      changeActiveBar={() => {}}
    />
  );
});

it('renders the correct number of bars', () => {
  const component = shallow(
    <BarWrapper
      activeBarIndex={1}
      barValues={[10, 20, 30]}
      changeActiveBar={() => {}}
    />
  );

  expect(component.find('Bar').length).toBe(3);
});

it('should set active to true for the active bar', () => {
  const component = shallow(
    <BarWrapper
      activeBarIndex={1}
      barValues={[10, 20, 30]}
      changeActiveBar={() => {}}
    />
  );

  expect(component.find('Bar').at(0).prop('active')).toBe(false);
  expect(component.find('Bar').at(1).prop('active')).toBe(true);
  expect(component.find('Bar').at(2).prop('active')).toBe(false);
});
