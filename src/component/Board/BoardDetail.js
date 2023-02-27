import React from "react";
import { useNavigate, useParams } from "react-router-dom";
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
        <h2 style={{ height: "120px", lineHeight: "120px" }}>
          {findItem.title}
        </h2>
        <div style={{ width: "80%", margin: "0 auto" }}>
          <p style={{ textAlign: "left" }}>작성자 : {findItem.userId}</p>
          <p style={{ textAlign: "left" }}>
            <b>{findItem.content}</b>
          </p>
        </div>
        <button onClick={backToList}>목록으로 돌아가기</button>
      </div>
    </div>
  );
};
export default BoardDetail;
