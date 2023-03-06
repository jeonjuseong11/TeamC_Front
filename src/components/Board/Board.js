import style from "./Board.module.css";
const Board = ({ children }) => {
  return <div className={style.Board}>{children}</div>;
};
export default Board;
