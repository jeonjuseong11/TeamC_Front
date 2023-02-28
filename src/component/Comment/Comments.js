import React, { useEffect, useRef, useState } from "react";
import Comment from "./Comment";
import style from "./Comment.module.css";

function Comments() {
  const no = useRef(2);
  const [comments, setComments] = useState([
    {
      id: "종섭",
      text: "임시댓글입니다.1",
      no: 2,
      created_date: new Date().getTime(),
      isModify: false,
    },
    {
      id: "지원",
      text: "임시댓글입니다.2",
      no: 1,
      created_date: new Date().getTime(),
      isModify: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  //수정여부 판단

  //댓글추가
  function addComment(e) {
    setComments([
      ...comments,
      {
        id: "테스트아이디",
        text: inputValue,
        no: (no.current += 1),
        created_date: new Date().getTime(),
        isModify: false,
      },
    ]);
    setInputValue("");
  }

  function inputChange(e) {
    setInputValue(e.target.value);
  }
  const handleOnKeyPress = (e) => {
    if (e.key === "Enter") {
      addComment(); // Enter 입력이 되면 클릭 이벤트 실행
    }
  };
  const removeComment = (no) => {
    console.log(`${no}가 삭제되었습니다`);
    const newCommentList = comments.filter((it) => it.no !== no);
    setComments(newCommentList);
  };
  const editComment = (targetId, newComment, newModify) => {
    setComments(
      comments.map((it) =>
        it.no === targetId
          ? { ...it, text: newComment, isModify: newModify }
          : it
      )
    );
  };
  return (
    <>
      <ul className={style.commentPostList}>
        {comments.map((item, id) => (
          <Comment
            key={id}
            comment={item}
            removeComment={removeComment}
            editComment={editComment}
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
    </>
  );
}

export default Comments;
