import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comment/Comments';
import style from './Board.module.css';
import { GetDataContext, PostsStateContext } from '../../App';
import CommentsWrapper from '../Comment/CommentsWrapper';
import Board from './Board';

const BoardDetail = () => {
  const post = useContext(PostsStateContext);
  const getData = useContext(GetDataContext);
  const navigate = useNavigate();
  const [data, setData] = useState();
  // const posts = JSON.parse(localStorage.getItem("postsInLocal")); localstorage사용실패
  let { no, board } = useParams();
  const backToList = () => {
    navigate(`/${board}`);
  };
  useEffect(() => {
    getData();
  }, []);
  console.log(no);
  useEffect(() => {
    if (post.length >= 1) {
      const targetPost = post.find((it) => parseInt(it.no) === parseInt(no));
      if (targetPost) {
        setData(targetPost);
      } else {
        alert('존재하지 않습니다');
        navigate(`/${board}`, { replace: true });
      }
    }
  }, [no, post, board, navigate]);
  if (!data) {
    return <div className={style.BoardDetail}>로딩중입니다.</div>;
  }
  const findItem = post.find((it) => {
    return parseInt(it.no) == parseInt(data.no);
  });
  console.log(findItem);
  return (
    <div className={style.BoardDetail}>
      <Board>
        <div className={style.boardContent}>
          <div className={style.boardTitle}>
            <button onClick={backToList}>&lt;</button>
            <h1>{findItem.title}</h1>
          </div>
          <div className={style.boardText}>
            <span>작성자 {findItem.userId}</span>
            <span>작성 시간 {findItem.create_dt}</span>
            <div dangerouslySetInnerHTML={{ __html: findItem.content }} />
            {/* 스타일을 읽을 라면 이거 써야된다고 함 */}
          </div>
          <button onClick={() => navigate(`/${board}/${++no}`)}>다음글</button>
          <button onClick={() => navigate(`/${board}/${no - 1}`)}>
            이전글
          </button>
        </div>
        <CommentsWrapper>
          <Comments />
        </CommentsWrapper>
      </Board>
    </div>
  );

  return <div></div>;
};
export default BoardDetail;
