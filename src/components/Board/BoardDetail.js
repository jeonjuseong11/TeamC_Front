import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Comments from '../Comment/Comments';
import style from './Board.module.css';
import { GetDataContext, PostsStateContext, UserDataContext } from '../../App';
import CommentsWrapper from '../Comment/CommentsWrapper';
import Board from './Board';
import axios from 'axios';

const BoardDetail = () => {
  const userInfo = useContext(UserDataContext);
  const post = useContext(PostsStateContext);
  const getData = useContext(GetDataContext);

  const navigate = useNavigate();
  const [data, setData] = useState();
  let { no, board } = useParams();
  const backToList = () => {
    navigate(`/${board}`);
  };
  useEffect(() => {
    getData();
  }, []);

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
  // console.log(findItem); 확인용
  //삭제 기능
  const removePosts = async () => {
    if (window.confirm('게시글을 삭제하시겠습니까?')) {
      if (findItem.userId == userInfo[1]) {
        try {
          const response = await axios.delete(
            `http://localhost:8080/api-board/delete?board_no=${findItem.board_no}`,
          );
          // console.log(response); api 확인용
          navigate(`/${board}`, { replace: true });
        } catch (error) {
          console.log(error);
        }
        alert('글을 삭제합니다');
        getData();
      } else {
        alert('권한이 없습니다');
      }
    }
  };
  return (
    <div className={style.BoardDetail}>
      <Board>
        <div className={style.boardContent}>
          <div className={style.boardTitle}>
            <button onClick={backToList}>&lt;</button>
            <p>{findItem.title}</p>
            <span>작성자 {findItem.userId}</span>
            <span>작성 시간 {findItem.create_dt}</span>
          </div>
          {findItem.userId == userInfo[1] ? (
            <div className={style.titlebtnWrapper}>
              <button
                onClick={() => {
                  if (window.confirm('게시글을 수정하시겠습니까')) {
                    navigate(`/${board}/${no}/edit`);
                  }
                }}
              >
                수정
              </button>
              <button onClick={removePosts}>삭제</button>
            </div>
          ) : null}
          <div className={style.boardText}>
            <div dangerouslySetInnerHTML={{ __html: findItem.content }} />
            {/* 스타일을 읽을 라면 이거 써야된다고 함 */}
          </div>
          <div className={style.btnWrapper}>
            <div>
              <button onClick={() => navigate(`/${board}/${++no}`)}>
                다음글
              </button>
              <button onClick={() => navigate(`/${board}/${no - 1}`)}>
                이전글
              </button>
            </div>
          </div>
        </div>
      </Board>
      <CommentsWrapper>
        <Comments board_no={findItem.board_no} />
      </CommentsWrapper>
    </div>
  );
};
export default BoardDetail;
