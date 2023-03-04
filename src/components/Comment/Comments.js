import React, { useRef, useState } from "react";
import Comment from "./Comment";
import style from "./Comment.module.css";

function Comments() {
  const no = useRef(2);
  const [comments, setComments] = useState([
    {
      id: "종섭",
      text: "임시댓글입니다.1",
      no: 1,
      created_date: new Date().getTime(),
      isModify: false,
    },
    {
      id: "지원",
      text: "임시댓글입니다.2",
      no: 2,
      created_date: new Date().getTime(),
      isModify: false,
    },
  ]);
  const [inputValue, setInputValue] = useState("");

  //댓글추가
  function addComment(e) {
    if (inputValue == "" || inputValue == null) {
      return;
    }
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
  //수정 했는지 안했는지 저장
  const changeIsModify = (targetId, newModify) => {
    setComments(
      comments.map((it) =>
        it.no == targetId ? { ...it, isModify: newModify } : it
      )
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
