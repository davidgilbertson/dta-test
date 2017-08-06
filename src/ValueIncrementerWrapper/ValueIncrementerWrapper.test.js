import React from 'react';
import { shallow } from 'enzyme';
import ValueIncrementerWrapper from './ValueIncrementerWrapper';

it('renders without crashing', () => {
  shallow(
    <ValueIncrementerWrapper
      buttonValues={[10, 20, 30]}
      changeCurrentBarValue={() => {}}
    />
  );
});

it('renders the correct number of ValueIncrementer components', () => {
  const wrapper = shallow(
    <ValueIncrementerWrapper
      buttonValues={[10, 20, 30]}
      changeCurrentBarValue={() => {}}
    />
  );

  expect(wrapper.find('ValueIncrementer').length).toBe(3);
});
