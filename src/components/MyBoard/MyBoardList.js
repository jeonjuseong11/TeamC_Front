import React, { useEffect, useState } from "react";
import style from "./MyBoard.module.css";
import MyBoardItem from "./MyBoardItem";
import Paging from "../Paging/Paging.js";
import { useContext } from "react";
// import { PostStateContext } from "../../pages/HomePage/Home.js";
import { PostsStateContext } from "../../App";
// import { PostsStateContext } from "../../App";
import { useRef } from "react";

const BoardList = ({ getData, setPostList }) => {
  
  const postList = useContext(PostsStateContext);
  const User = {
    userId: 1,
    id: "1@gmail.com",
    pw: "A!11111111",
    name : "홍길동",
    email : "1@gmail.com",
    sex : "male",
    age: "20000101"
  };

  //pagination
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(10); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들

  useEffect(() => {
    setCount(postList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(postList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postList, postPerPage]);

  // 유저가 작성한 글을 userId를 통해 필터함
  const filterData = postList.filter((it) =>
        it.userId === User.id
      );

  return (
    <div className={style.BoardList}>
      <div
        style={{
          margin: "0 auto",
          marginLeft: "10px",
          borderRadius: "10px",
        }}
      >
        <table className={style.table}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="55%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>작성일시</th>
            </tr>
          </thead>
          <tbody>
            {filterData && filterData.length > 0 ? (
              filterData.map((it) => <MyBoardItem key={it.no} {...it} />)
            ) : (
              <tr>
                <td colSpan="4" style={{ height: "60vh" }}>
                  작성글이 없습니다.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <Paging
          page={currentPage}
          count={count}
          setPage={setCurrentPage}
          totalPosts={postList.length}
        />
      </div>
    </div>
  );
};
export default BoardList;
