import React, { useEffect, useState } from "react";
import style from "./Board.module.css";
import BoardItem from "./BoardItem";
import Paging from "../Paging/Paging.js";
import { useContext } from "react";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { PostsStateContext } from "../../App";
const BoardList = ({ getData, setPostList }) => {
  const postList = useContext(PostsStateContext);
  let { board } = useParams();
  console.log(postList);
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
  //검색창 state
  const [search, setSearch] = useState("");
  const titleInput = useRef();
  //검색창 action 코드
  const onChangeSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  //검색 기능 코드
  const initList = (e) => {
    getData();
    setSearch("");
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === "") {
      titleInput.current.focus();
      alert("검색란이 비었다");
    } else {
      const filterData = postList.filter((it) =>
        it.title.toLocaleLowerCase().includes(search.toLocaleLowerCase())
      );
      setPostList(filterData);
      setCurrentPosts(filterData.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentPage(1);
      return;
    }
  };

  return (
    <div className={style.BoardList}>
      <form className={style.searchForm}>
        <input
          type="text"
          className={style.nameInput}
          ref={titleInput}
          placeholder="제목"
          onChange={onChangeSearch}
          value={search}
        />
        <button className={style.searchBtn} onClick={onSearch} type="submit">
          Search
        </button>
        <button type="button" className={style.resetBtn} onClick={initList}>
          초기화
        </button>
      </form>
      <div className={style.info}>
        <h4>{postList.length}개의 글이 있습니다.</h4>
      </div>

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
            {currentPosts && postList.length > 0 ? (
              currentPosts.map((it) => (
                <BoardItem key={it.no} {...it} board={board} />
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ height: "60vh" }}>
                  검색 결과가 없습니다
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
