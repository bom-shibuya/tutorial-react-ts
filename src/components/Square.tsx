import * as React from 'react';
import { SquareValue } from '../types'

export interface ISquareProps {
  value: SquareValue;
  onClick: () => void;
}

export const Square = ({value, onClick}: ISquareProps) => (
  <button
    className="square"
    onClick={onClick}>
    {value}
  </button>
)
