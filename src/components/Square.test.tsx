import { shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import { Square } from './Square';

describe('Square test', () => {
  let square: ShallowWrapper;
  let testMock: jest.Mock;

  beforeEach(() => {
    testMock = jest.fn();
    square = shallow(<Square value={'X'} onClick={testMock}/>)
  }) 

  test('受け取ったpropsの値を表示する', () => {
    expect(square.text()).toBe('X');
    square.setProps({value: 'O'});
    expect(square.text()).toBe('O');
  })

  test('propsのvalueがnullなら何も表示しない', () => {
    square.setProps({value: null});
    expect(square.text()).toBe('');
  })

  test('propsのvalueがnullなら何も表示しない', () => {
    square.setProps({value: null});
    expect(square.text()).toBe('');
  })

  test('クリックイベントが呼べる', () => {
    square.simulate('click');
    expect(testMock).toHaveBeenCalled();
  })
})