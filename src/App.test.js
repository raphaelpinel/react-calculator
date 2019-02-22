import React from 'react';
import { mount, shallow } from 'enzyme';
import App from './App';
import Display from './components/Display/Display';

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

describe('calculations without =', () => {
  let wrapper;
  beforeEach(() => wrapper = mount(<App />));

  it('should update display when a number key is clicked', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="7"]').simulate('click');
    expect(wrapper.state('display')).toEqual('7');
  });

  it('should display a negative number if a positive number was displayed before by pressing the +/- key ', () => {
    wrapper.setState({ display: '16'});
    wrapper.find('[value="+/-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('-16');
  });

  it('should display a positive number if a negative number was displayed before by pressing the +/- key ', () => {
    wrapper.setState({ display: '-16'});
    wrapper.find('[value="+/-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('16');
  });

  it('should display a positive number if a negative number was displayed before by pressing the +/- key 3 times ', () => {
    wrapper.setState({ display: '-16'});
    wrapper.find('[value="+/-"]').simulate('click');
    wrapper.find('[value="+/-"]').simulate('click');
    wrapper.find('[value="+/-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('16');
  });

  it('precedence 1+2*3*5+6/2*3', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="6"]').simulate('click');
    wrapper.find('[value="/"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('40');
  });

  it('should replace old operator with new one 2+3-*', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    expect(wrapper.state('display')).toEqual('5');
  });

  it('precedence 1+2*3*', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    expect(wrapper.state('display')).toEqual('6');
  });

  it('precedence 1+2*3-', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('7');
  });


  it('precedence test 4', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="/"]').simulate('click');
    wrapper.find('[value="4"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('103');
  });

  it('1+2+', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('6');
  });

  it('multiple + with final +', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('2');
  });

  it('calculating immediately 5 + 3 +', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('8');
  });

  it('calculating immediately 5 * 3 -', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('15');
  });

  it('multiple dots', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('2.');
  });

  it('basic percentage', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="%"]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.5');
  });

  it('10 + 30%', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="%"]').simulate('click');
    expect(wrapper.state('display')).toEqual('13');
  });

  it('1000 +', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('1000');
  });

  it('0.0010 + ', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.0010');
  });

  it('0.0010 + 00.001 -', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.002');
  });

  it('0.', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.');
  });

});

describe('calculations with equal', () => {
  let wrapper;
  beforeEach(() => wrapper = mount(<App />));


  it('precedence 1+2*3=', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('7');
  });

  it('1+2*3-8=', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="-"]').simulate('click');
    wrapper.find('[value="8"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('-1');
  });

  it('precedence test 3', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="8"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('51');
  });

  it('multiple + with final =', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('3');
  });

  it('leading zero 1', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('3');
  });

  it('leading zero 001 + 002 =', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('3');
  });

  it('reset 5*6= 2', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="6"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    expect(wrapper.state('display')).toEqual('2');
  });

  it('100 + 30%=', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="%"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('130');
  });

  it('2 / 0 =', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="/"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('Infinity');
  });

  it('1000=+3=', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('1003');
  });

  it('1000===', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('1000');
  });

  it('8(+/-)+6=', () => {
    wrapper.setState({ display: '0' });
    wrapper.find('[value="8"]').simulate('click');
    wrapper.find('[value="+/-"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="6"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('-2');
  });

  it('-8(+/-)(+/-)', () => {
    wrapper.setState({ display: '-8' });
    wrapper.find('[value="+/-"]').simulate('click');
    wrapper.find('[value="+/-"]').simulate('click');
    expect(wrapper.state('display')).toEqual('-8');
  });

  it('1+2= 3+2=', () => {
    wrapper.setState({ display: '0'});
    wrapper.find('[value="1"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('5');
    expect(wrapper.state('memory')).toEqual([]);
  });

  it('2=+', () => {
    wrapper.setState({ display: '0'});
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    expect(wrapper.state('display')).toEqual('2');
  });

  it('3=', () => {
    wrapper.setState({ display: '0'});
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('3');
    expect(wrapper.state('memory')).toEqual([]);
  });

  it('3+*/=', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="*"]').simulate('click');
    wrapper.find('[value="/"]').simulate('click');
    expect(wrapper.state('display')).toEqual('3');
    expect(wrapper.state('memory')).toEqual(['3', '/']);
  });

  it('3+.', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.');
  });

  it('0.2+0.4', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="2"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="0"]').simulate('click');
    wrapper.find('[value="."]').simulate('click');
    wrapper.find('[value="4"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('0.6');
  });

  it('9+3C4=', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="9"]').simulate('click');
    wrapper.find('[value="+"]').simulate('click');
    wrapper.find('[value="3"]').simulate('click');
    wrapper.find('[name="AC"]').simulate('click');
    expect(wrapper.state('display')).toEqual('0');
    wrapper.find('[value="4"]').simulate('click');
    wrapper.find('[value="="]').simulate('click');
    expect(wrapper.state('display')).toEqual('13');
  });

  it('56C and AC to C', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="5"]').simulate('click');
    expect(wrapper.find('[name="AC"]').html()).toEqual('<div class="Button lightgrey" data-value="C">C</div>');
    wrapper.find('[value="6"]').simulate('click');
    wrapper.find('[name="AC"]').simulate('click');
    expect(wrapper.find('[name="AC"]').html()).toEqual('<div class="Button lightgrey" data-value="AC">AC</div>');
    expect(wrapper.state('display')).toEqual('0');
  });

  it('96C', () => {
    wrapper.setState({ memory: [], display: '0'});
    wrapper.find('[value="5"]').simulate('click');
    wrapper.find('[value="6"]').simulate('click');
    wrapper.find('[name="AC"]').simulate('click');
    expect(wrapper.state('display')).toEqual('0');
  });



});

  