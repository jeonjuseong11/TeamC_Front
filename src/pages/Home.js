import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import BoardDetail from "../component/Board/BoardDetail";
import BoardList from "../component/Board/BoardList";
import Sidebar from "../component/Sidebar";
import Profile from "./Profile";
const Home = ({ id }) => {
  const menus = [
    { name: "자유게시판", path: "/board1" },
    { name: "비밀게시판", path: "/board2" },
  ];
  const [postList, setPostList] = useState([]);
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
  //새글 작성
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
  return (
    <div style={{ textAlign: "center", height: "100vh", overflow: "hidden" }}>
      <Sidebar menus={menus} />
      <Routes>
        <Route
          exact
          path="/board1/*"
          element={
            <BoardList
              id={id}
              postList={postList}
              setPostList={setPostList}
              getData={getData}
            />
          }
        />
        <Route
          exact
          path="/board2"
          element={<BoardList id={id} menus={menus.name} />}
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route
          exact
          path="/board1/:no"
          element={<BoardDetail post={postList} />}
        />
      </Routes>
    </div>
  );
};

export default Home;
