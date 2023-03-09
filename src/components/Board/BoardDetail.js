import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comment/Comments';
import style from './Board.module.css';
import { useContext } from 'react';
import { PostsStateContext } from '../../App';
import CommentsWrapper from '../Comment/CommentsWrapper';
import Board from './Board';

const BoardDetail = () => {
  const post = useContext(PostsStateContext);
  // const posts = JSON.parse(localStorage.getItem("postsInLocal")); localstorage사용실패
  let { no } = useParams();
  let findItem = post.find(function (it) {
    return it.no == no;
  });
  // console.log(findItem);

  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  };

  return (
    <div>
      <div className={style.BoardDetail}>
        <Board>
          <div className={style.boardContent}>
            <div className={style.boardTitle}>
              <button onClick={backToList}>&lt;</button>
              <h1>{findItem.title}</h1>
            </div>
            <div className={style.boardText}>
              <span>작성자 {findItem.userId}</span>
              <span>작성 시간 {findItem.created_date}</span>

              <p>
                <b>{findItem.content}</b>
              </p>
            </div>
          </div>
          <CommentsWrapper>
            <Comments />
          </CommentsWrapper>
        </Board>
      </div>
    </div>
  );
};
export default BoardDetail;
