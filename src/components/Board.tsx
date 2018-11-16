import * as React from 'react';

import { Squares } from '../types';
import { Square } from './Square';

export interface IBoardProps {
  squares: Squares;
  handleClick: (i:number) => void;
}

export const Board = ({handleClick, squares}: IBoardProps) => {

  const renderSquare = (i: number) => {
    const onClick = () => handleClick(i)
    return (
      <Square
        value={squares[i]}
        onClick={onClick}/>
    )
  }

  return (
    <div>
      <div className="border-row">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="border-row">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="border-row">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  )
}
