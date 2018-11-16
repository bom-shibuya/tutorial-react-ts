import * as React from 'react';
import './App.css';
import { Board } from './components/Board'
import { Squares } from './types'

export const calculateWinner = (squares: Squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (const line of lines) {
    const [a, b, c] = line;
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a]; // 'X' of 'O'
    }
  }
  return null;
}


export interface IGameState {
  currentHistory: number;
  squares: Squares;
  xIsNext: boolean;
  history: Array<{
    squares: Squares
  }>
}

class App extends React.Component<{}, IGameState> {
  public state: IGameState = {
    currentHistory: 0,
    history: [{
      squares: Array(9).fill(null)
    }],
    squares: Array(9).fill(null),
    xIsNext: true,
  }

  public handleClick = (i: number) => {
    const squares = this.state.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    const history = [...this.state.history.slice(0, this.state.currentHistory + 1), {
      squares
    }];

    this.setState({
      currentHistory: this.state.currentHistory + 1,
      history,
      squares,
      xIsNext: !this.state.xIsNext,
    })
  }

  public handleHistory(i: number) {
    const selectedHistory = this.state.history[i].squares.slice();
    this.setState({
      currentHistory: i,
      squares: selectedHistory,
      xIsNext: (i % 2 === 0)
    })

  }

  public render() {
    const winner = calculateWinner(this.state.squares);
    const status = winner ? `Winner: ${winner}` : `Next Player: ${this.state.xIsNext ? 'X' : 'O'}`;
    const histories = this.state.history.map((history, i) => {
      const text = i === 0 ? 'Back to game start' : `Back to #${i}`;
      const handleHistory = () => this.handleHistory(i)
      return (
        <li key={i}>
          <button onClick={handleHistory}>{text}</button>
        </li>
      )
    })
    return (
      <div className="game">
      <div className="gema-board">
        <Board
          squares={this.state.squares}
          handleClick={this.handleClick}/>
      </div>
      <div className="game-info">
        <div>{ status }</div>
        <ol>
          {histories}
        </ol>
      </div>
    </div>
    )
  }
}
export default App;
