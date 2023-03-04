import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BoardDetail from "../../components/Board/BoardDetail";
import BoardList from "../../components/Board/BoardList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Profile from "../ProfilePage/Profile";
import Top from "../../components/Top/Top";
export const PostStateContext = React.createContext(); //posts 데이터 context
const Home = ({ User, menus, setIsLogin }) => {
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
    // setLocalStrage();
  };
  // const setLocalStrage = () => {
  //   localStorage.setItem("postsInLocal", JSON.stringify(postList));
  // };
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
    <PostStateContext.Provider value={postList}>
      <div
        style={{
          textAlign: "center",
          height: "100vh",
        }}
      >
        <Top User={User} setIsLogin={setIsLogin} />
        <Sidebar menus={menus} />
        <Routes>
          <Route exact path="/profile" element={<Profile />} />
          <Route
            exact
            path="/home/board1"
            element={<BoardList setPostList={setPostList} getData={getData} />}
          />

          <Route
            exact
            path="/home/board2"
            element={<BoardList setPostList={setPostList} getData={getData} />}
          />
          <Route exact path="/home/board1/:no" element={<BoardDetail />} />
        </Routes>
      </div>
    </PostStateContext.Provider>
  );
};

export default Home;
