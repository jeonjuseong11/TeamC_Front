import React, {
  useEffect,
  useSelector,
  dispatch,
  useRef,
  reviewActions,
} from "react";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../Comment/Comments";

import style from "./Board.module.css";
const BoardDetail = ({ post }) => {
  let { no } = useParams();
  let findItem = post.find(function (it) {
    return it.no == no;
  });
  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  };

  return (
    <div className={style.BoardDetail}>
      <div className={style.board}>
        <div className={style.boardContent}>
          <div className={style.boardTitle}>
            <h2>{findItem.title}</h2>
          </div>

          <div className={style.boardText}>
            <p style={{ textAlign: "left" }}>작성자 : {findItem.userId}</p>
            <p style={{ textAlign: "left" }}>
              <b>{findItem.content}</b>
            </p>
            <button onClick={backToList}>목록으로 돌아가기</button>
          </div>
        </div>
        <div className={style.CommentsWrapper}>
          <Comments />
        </div>
      </div>
    </div>
  );
};
export default BoardDetail;
