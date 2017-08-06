import React from 'react';
import { shallow } from 'enzyme';
import Bar from './Bar';

it('renders without crashing', () => {
  shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={10}
      pos={2}
    />
  );
});

it('renders the value formatted as a percentage', () => {
  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={66}
      pos={2}
    />
  );

  expect(component.find('.Bar__fill').prop('style').width).toBe('66%');
});

it('does not allow a bar to be more than 100%', () => {
  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={1000}
      pos={2}
    />
  );

  expect(component.find('.Bar__fill').prop('style').width).toBe('100%');
});

it('applies an --active class to the active bar', () => {
  const component = shallow(
    <Bar
      active={true}
      changeActiveBar={() => {}}
      value={1000}
      pos={2}
    />
  );

  expect(component.find('.Bar').hasClass('Bar--active')).toBe(true);
});

it('does not apply an --active class to a non-active bar', () => {
  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={1000}
      pos={2}
    />
  );

  expect(component.find('.Bar').hasClass('Bar--active')).toBe(false);
});

it('applies an --over-warning class when the value is over 100', () => {
  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={1000}
      pos={2}
    />
  );

  expect(component.find('.Bar__fill').hasClass('Bar__fill--over-warning')).toBe(true);
});

it('does not apply an --over-warning class when the value is under 100', () => {
  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={() => {}}
      value={10}
      pos={2}
    />
  );

  expect(component.find('.Bar__fill').hasClass('Bar__fill--over-warning')).toBe(false);
});

it('changes the active bar when clicked', () => {
  const changeActiveBarMock = jest.fn();

  const component = shallow(
    <Bar
      active={false}
      changeActiveBar={changeActiveBarMock}
      value={10}
      pos={2}
    />
  );

  component.find('.Bar').simulate('click');
  expect(changeActiveBarMock).toHaveBeenCalledTimes(1)
  expect(changeActiveBarMock).toHaveBeenCalledWith(2)
});
