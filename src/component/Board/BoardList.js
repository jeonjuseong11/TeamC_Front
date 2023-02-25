import React, { useEffect, useRef, useState } from "react";
// import { Link } from "react-router-dom";
import style from "./Board.module.css";
import BoardItem from "./BoardItem";
import profile from "../Board/profile.jpg";
import Paging from "../Paging";
import { Link, useNavigate } from "react-router-dom";
const BoardList = () => {
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
  const navigate = useNavigate();
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
    }
    setTitleSearch("");
    //검색시 다시 주소 원상복구
  };

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());
    const initData = res.slice(0, 100).map((it, idx) => {
      idx++;
      return {
        title: it.name,
        content: it.body,
        created_date: new Date().getTime(),
        no: idx,
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

  const onCreate = (title, content, idx) => {
    const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      created_date,
      no: idx.current + 1, //1이라는 값을 가르킴
    };
    idx.current += 1; //다음 일기 id를 위해 id를 1추가함
    setPostList([...postList, newItem]); //기존 배열 앞에 새로운 아이템을 추가
  };
  return (
    <div className={style.BoardList}>
      <ul className={style.profile}>
        <Link to={"/profile"}>
          <li>
            <p>user</p>
          </li>
          <li>
            <img src={profile} />
          </li>
        </Link>
      </ul>

      <form className={style.searchForm}>
        <input type="text" className={style.tagInput} placeholder="태그" />
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
          <caption>자유 게시판</caption>
          <colgroup>
            <col width="10%" />
            <col width="70%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
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
