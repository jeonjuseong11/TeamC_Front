import React, { useContext, useEffect, useRef, useState } from 'react';
import style from './Comment.module.css';
import src from '../../assets/profile.png';
import { UserDataContext } from '../../App';
function Comment({ removeComment, editComment, comment }) {
  const userInfo = useContext(UserDataContext);
  const [localIsModify, setLocalIsModify] = useState();
  useEffect(() => {
    setLocalContent(comment.text);
    // console.log(comment);
    setLocalIsModify(comment.isModify);
    // console.log(comment.isModify); 수정상황 반영되는지 확인
  }, [comment, comment.isModify, localIsModify]);

  //삭제기능
  const [localContent, setLocalContent] = useState(comment.text);
  const localContentInput = useRef();

  const handleRemove = () => {
    console.log(comment.no);
    if (window.confirm(`댓글를 정말 삭제하시겠습니까?`)) {
      removeComment(comment);
    }
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    console.log(comment.text);
    setLocalContent(comment.text);
    setLocalIsModify(comment.isModify);
  };
  //수정하기를 누르고 원본 데이터를 고쳐도 다시 수정하기를 취소하구 누르면 원래대로 돌아온다
  const handleEdit = () => {
    if (window.confirm(`댓글를 수정하시겠습니까?`)) {
      editComment(comment, localContent);
      toggleIsEdit();
    }
  };
  const [isEdit, setIsEdit] = useState(false);
  //수정중인 상태면 true 아니면 false인 상태 정의
  const toggleIsEdit = () => {
    if (userInfo[1] == comment.id) {
      setIsEdit(!isEdit);
      setLocalIsModify(true);
    } else {
      alert('권한이 없습니다');
    }
  };
  //not 연산자를 활용하여 반대 상태로 만들어주는 기능 생성
  return (
    <li className={style.commentPost} key={comment.id}>
      <img src={src}></img>
      <div className={style.commentText}>
        <p>{comment.id}</p>
        <span>{comment.update_dt !== null ? <p>수정됨</p> : <></>}</span>
        <p>
          {comment.update_dt !== null ? comment.update_dt : comment.create_dt}
        </p>
        <div className={style.commentContent}>
          {isEdit ? (
            <textarea
              value={localContent}
              ref={localContentInput}
              onChange={(e) => {
                setLocalContent(e.target.value);
              }}
            />
          ) : (
            <>{comment.text}</>
          )}
        </div>
        <div className={style.commentButton}>
          {isEdit ? (
            <>
              <button onClick={handleQuitEdit}>취소</button>
              <button onClick={handleEdit}>완료</button>
            </>
          ) : (
            <>
              <button onClick={handleRemove}>삭제</button>
              <button onClick={toggleIsEdit}>수정</button>
            </>
          )}
        </div>
      </div>
    </li>
  );
}

export default Comment;
