import style from './Comment.module.css';
import React from 'react';
const CommentsWrapper = ({ children }) => {
  return <div className={style.CommentsWrapper}>{children}</div>;
};
export default CommentsWrapper;
