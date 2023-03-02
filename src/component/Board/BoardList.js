import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import style from "./Board.module.css";
import BoardItem from "./BoardItem";
import profile from "../Board/profile.jpg";
import Paging from "../Paging";
import {
  Link,
  Route,
  Routes,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { useRef } from "react";

const BoardList = ({ id, setPostList, postList, getData }) => {
  //pagination
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(10); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  //검색창 state
  const [titleSearch, setTitleSearch] = useState("");
  const [idSearch, setIdSearch] = useState("");
  const titleInput = useRef();
  const idInput = useRef();
  // const navigate = useNavigate();
  const location = useLocation();
  //검색창 action 코드
  const onChangeSearchTitle = (e) => {
    e.preventDefault();
    setTitleSearch(e.target.value);
  };
  const onChangeSearchId = (e) => {
    e.preventDefault();
    setIdSearch(e.target.value);
  };
  //검색 기능 코드
  const initList = (e) => {
    getData();
    setTitleSearch("");
  };
  const onSearchTitle = (e) => {
    e.preventDefault();
    if (titleSearch === null || titleSearch === "") {
      titleInput.current.focus();
      alert("검색란이 비었다");
    } else {
      const filterData = postList.filter((it) =>
        it.title.includes(titleSearch)
      );
      setPostList(filterData);
      setCurrentPosts(filterData.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentPage(1);
      return;
    }
    setTitleSearch("");
  };

  useEffect(() => {
    setCount(postList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(postList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postList, postPerPage]);

  //제목 변환
  const titlePick = () => {
    if (location.pathname == "/board1") {
      return "자유 게시판";
    } else if (location.pathname == "/board2") {
      return "비밀 게시판";
    }
  };

  return (
    <div className={style.BoardList}>
      <h2>{titlePick()}</h2>
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
      <form className={style.searchForm}>
        <input
          type="text"
          className={style.tagInput}
          ref={idInput}
          placeholder="작성자"
          onChange={onChangeSearchId}
          value={idSearch}
        />
        <input
          type="text"
          className={style.nameInput}
          ref={titleInput}
          placeholder="제목"
          onChange={onChangeSearchTitle}
          value={titleSearch}
        />
        <button
          className={style.searchBtn}
          onClick={onSearchTitle}
          type="submit"
        >
          Search
        </button>
        <button className={style.resetBtn} type="reset" onClick={initList}>
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
              currentPosts.map((it) => <BoardItem key={it.no} {...it} />)
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
