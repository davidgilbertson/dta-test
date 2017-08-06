import React from 'react';
import { shallow } from 'enzyme';
import ValueIncrementer from './ValueIncrementer';

it('renders without crashing', () => {
  shallow(
    <ValueIncrementer
      value={10}
      changeCurrentBarValue={() => {}}
    />
  );
});

it('calls #changeCurrentBarValue with the correct value when clicked', () => {
  const changeCurrentBarValue = jest.fn();

  const component = shallow(
    <ValueIncrementer
      value={10}
      changeCurrentBarValue={changeCurrentBarValue}
    />
  );

  component.simulate('click');

  expect(changeCurrentBarValue).toHaveBeenCalledTimes(1);
  expect(changeCurrentBarValue).toHaveBeenCalledWith(10);
});
