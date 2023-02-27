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
import BoardDetail from "./BoardDetail";
import Profile from "../../pages/Profile";
import Login from "../../Login";
const BoardList = ({ id, pw }) => {
  const [postList, setPostList] = useState([]);
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
  // const navigate = useNavigate();
  const location = useLocation();
  //검색창 action 코드
  const onChangeSearch = (e) => {
    e.preventDefault();
    setTitleSearch(e.target.value);
  };
  //검색 기능 코드
  const onSearch = (e) => {
    e.preventDefault();
    if (titleSearch === null || titleSearch === "") {
      getData();
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
    //검색시 다시 주소 원상복구
  };

  const getData = async () => {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts").then(
      (res) => res.json()
    );
    const initData = res.slice(0, 100).map((it) => {
      return {
        userId: it.userId,
        title: it.title,
        content: it.body,
        created_date: new Date().getTime(),
        no: it.id,
      };
    });
    setPostList(initData);
  };

  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    setCount(postList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(postList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postList, postPerPage]);

  const onCreate = (userId, title, content, id) => {
    const created_date = new Date().getTime();
    const newItem = {
      userId,
      title,
      content,
      created_date,
      no: id, //1이라는 값을 가르킴
    };
    id.current += 1; //다음 일기 id를 위해 id를 1추가함
    setPostList([...postList, newItem]); //기존 배열 앞에 새로운 아이템을 추가
  };
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
          placeholder="작성자"
          onChange={onChangeSearch}
          value={idSearch}
        />
        <input
          type="text"
          className={style.nameInput}
          placeholder="제목"
          onChange={onChangeSearch}
          value={titleSearch}
        />
        <button className={style.searchBtn} onClick={onSearch}>
          Search
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
            {currentPosts && postList.length > 0
              ? currentPosts.map((it) => <BoardItem key={it.no} {...it} />)
              : null}
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
