import style from "./Comment.module.css";
const CommentsWrapper = ({ children }) => {
  return <div className={style.CommentsWrapper}>{children}</div>;
};
export default CommentsWrapper;
