import style from './Board.module.css';
import React from 'react';
const Board = ({ children }) => {
  return <div className={style.Board}>{children}</div>;
};
export default React.memo(Board);
