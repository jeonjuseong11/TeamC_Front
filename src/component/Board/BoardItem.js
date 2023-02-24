import { Link } from "react-router-dom";
import style from "./Board.module.css";

const DiaryItem = ({ title, created_date, no }) => {
  return (
    <div className={style.BoardItem}>
      <div className={style.info}>
        <span>
          <b> {no} </b>
        </span>
        <span>
          <Link
            to={`/board/${no}`}
            style={{ textDecoration: "none", color: "black" }}
          >
            {title}
          </Link>
        </span>
        <span>
          작성일자 :
          {
            new Date(created_date) /*인자이 ms를 넣어주면 ms를 기준으로 생성*/
              .toLocaleString() /*인간이 알아보기 좋은 숫자로 변환*/
          }
        </span>
      </div>
    </div>
  );
};
export default DiaryItem;
