import { mount, ReactWrapper, render, shallow, ShallowWrapper } from 'enzyme';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import App, { calculateWinner, IGameState } from './App';
import { Board } from './components/Board'
import { Square } from './components/Square'
import { Squares } from './types';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const noWin: Squares = [
  'X', 'O', 'X',
  null, 'O', null,
  'X', null, 'X',
];
const xWin: Squares = [
  'X', 'O', 'X',
  'X', 'O', null,
  'X', null, 'X',
];
const oWin: Squares = [
  'X', 'O', 'X',
  'X', 'O', null,
  null, 'O', 'X',
];

describe('calculateWinner', () => {
  test('勝負が決まってない場合はnullを返す', () => {
    expect(calculateWinner(noWin)).toBeNull();
  });

  test('Xが勝った場合はXを返す', () => {
    expect(calculateWinner(xWin)).toBe('X');
  });

  test('Oが勝った場合はOを返す', () => {
    expect(calculateWinner(oWin)).toBe('O');
  });
})


describe('App test', () => {

  let app: ShallowWrapper;
  let setStateSpy: jest.SpyInstance;

  beforeEach(() => {
    app = shallow(<App />);
    setStateSpy = jest.spyOn(App.prototype, 'setState');
  })

  test('子コンポーネントが存在する', () => {
    expect(app.find(Board).length).toBe(1);
  })

  describe('handleClickの呼び出し', () => {
    const clickNum = 0;
    const expectState: IGameState = {
      currentHistory: 1,
      history: [
        {
          squares: Array(9).fill(null)
        },
        {
          squares: [
            'X', ...Array(8).fill(null)
          ]
        }
      ],
      squares: [
        'X', ...Array(8).fill(null)
      ],
      xIsNext: false
    }

    test('任意のボタンをクリック', () => {
      app.instance().handleClick(clickNum);
      expect(setStateSpy).toHaveBeenCalledWith(expectState);
    })

    test('同じ場所はクリックできない', () => {
      app.instance().handleClick(clickNum);
      app.instance().handleClick(clickNum);
      expect(setStateSpy).toHaveBeenCalledWith(expectState);
    })

    test('結果が確定後はクリックできない', () => {
      const endState: IGameState = {
        currentHistory: 2,
        history: [
          ...expectState.history,
          {
            squares: xWin
          }
        ],
        squares: xWin,
        xIsNext: false
      };
      app.setState(endState);
      app.instance().handleClick(clickNum);
      expect(setStateSpy).toHaveBeenCalledWith(endState);
    })
  })

  describe('handleHistoryの呼び出し', () => {

    let appMount: ReactWrapper;
    let square1: ReactWrapper;
    let square2: ReactWrapper;
    let square3: ReactWrapper;

    beforeEach(() => {
      appMount = mount(<App />);
      square1 = appMount.find(Square).at(0);
      square2 = appMount.find(Square).at(1);
      square3 = appMount.find(Square).at(2);
    })

    test('任意の位置に戻れる', () => {
      square1.simulate('click');
      const stashState = {...appMount.instance().state};
      square2.simulate('click');
      square3.simulate('click');

      const historyBtn2 = appMount.find('li').at(1).find('button');
      historyBtn2.simulate('click');
      expect(setStateSpy).toHaveBeenCalledWith(stashState);
      // expect()
    })

    test('任意の位置に戻った後squareがクリックされるとhistoryが更新される', () => {
      square1.simulate('click');
      square2.simulate('click');
      square3.simulate('click');
      const historyBtn2 = appMount.find('li').at(1).find('button');
      historyBtn2.simulate('click');
      // 戻っただけではヒストリーは更新されない
      expect(appMount.instance().state.history.length).toBe(4);
      // 戻った後、squareが押されると以降の部分が更新される
      square3.simulate('click');
      expect(appMount.instance().state.history.length).toBe(3);
    })
  })



})
