import React from "react";
import { Link } from "react-router-dom";
import { useNavigate, useParams } from "react-router-dom";
import Comments from "../Comment/Comments";
import profile from "../Board/profile.jpg";

import style from "./Board.module.css";
const BoardDetail = ({ post, id }) => {
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
      <h2>자유 게시판</h2>
      <ul className={style.profile}>
        <Link to={"/profile"}>
          <li>
            <span>{id}</span>
            <span> 님, 반갑습니다</span>
          </li>
          <li>
            <img src={profile} />
          </li>
        </Link>
      </ul>
      <div className={style.board}>
        <div className={style.boardContent}>
          <div className={style.boardTitle}>
            <button onClick={backToList}>&lt;</button>
            <h1>{findItem.title}</h1>
          </div>
          <div className={style.boardText}>
            <span>작성자 {findItem.userId}</span>
            <span>
              작성 시간 {new Date(findItem.created_date).toLocaleString()}
            </span>

            <p>
              <b>{findItem.content}</b>
            </p>
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
