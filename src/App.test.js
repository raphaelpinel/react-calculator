import React from 'react';
import { shallow } from 'enzyme';
import App from './App';
import Display from './components/Display/Display';
import Button from './components/Button/Button';

describe('App', () => {
  let wrapper;
  beforeEach(() => wrapper = shallow(<App />));

  it('should render a <div />', () => {
    expect(wrapper.find('div').length).toEqual(2);
  });
  
  it('should render Display', () => {
    expect(wrapper.containsMatchingElement(<Display />)).toEqual(true);
  });

  it('should render Buttons', () => {
    expect(wrapper.find('Button').length).toEqual(19);
  });
});

  