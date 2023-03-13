import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserDataContext } from '../../App';
import Comment from './Comment';
import style from './Comment.module.css';
function Comments() {
  let { no } = useParams();
  const [comments, setComments] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const userInfo = useContext(UserDataContext);
  async function getComments() {
    try {
      const response = await axios.get('http://localhost:8080/api-comment/list', {
        params: { board_no: no },
      });
      const initComments = response.data.map((it) => {
        return {
          comment_no: it.comment_no,
          no: it.comment_no,
          text: it.comment_text,
          id: it.user_name,
          user_no: it.user_no,
        };
      });
      setComments(initComments);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getComments();
  }, []);
  //댓글추가
  const addComment = async (e) => {
    if (inputValue == '' || inputValue == null) {
      alert('입력란을 채워주세요');
      return;
    }
    try {
      const response = await axios.post(
        'http://localhost:8080/api-comment/new',
        null,
        {
          params: {
            comment_text: inputValue,
            user_no: userInfo[0],
            board_no: no,
            user_name: userInfo[1],
          },
        },
      );
      console.log(response); //성공여부 판단
      // alert('댓글작성 성공');
      getComments();
      setInputValue('');
    } catch (error) {
      console.log(error);
    }
  };

  function inputChange(e) {
    setInputValue(e.target.value);
  }
  const handleOnKeyPress = (e) => {
    if (e.key === 'Enter') {
      addComment(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const removeComment = async (comment) => {
    console.log(comment);
    if (comment.user_no == userInfo[0]) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api-comment/delete?comment_no=${comment.comment_no}`
        );
        console.log('삭제 요청');
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    } else {
      alert('권한이 없습니다');
    }
  };
  const editComment = (targetId, newComment, newModify) => {
    // setComments(
    //   comments.map((it) =>
    //     it.comment_no === targetId
    //       ? { ...it, text: newComment, isModify: newModify }
    //       : it,
    //   ),
    // );
  };
  //수정 했는지 안했는지 저장
  const changeIsModify = (targetId, newModify) => {
    setComments(
      comments.map((it) =>
        it.comment_no == targetId ? { ...it, isModify: newModify } : it,
      ),
    );
  };
  return (
    <div>
      <ul className={style.commentPostList}>
        {comments.map((item, id) => (
          <Comment
            key={id}
            comment={item}
            removeComment={removeComment}
            editComment={editComment}
            changeIsModify={changeIsModify}
          />
        ))}
      </ul>
      <div className={style.commentInput}>
        <input
          onKeyPress={handleOnKeyPress}
          onChange={inputChange}
          value={inputValue}
          placeholder="댓글을 입력하세요"
        />
        <button onClick={addComment} />
      </div>
    </div>
  );
}

export default Comments;
