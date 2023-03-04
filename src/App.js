import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login.js";
import "./App.css";
import Home from "./pages/HomePage/Home.js";
import Join from "./pages/JoinPage/Join.js";
import Profile from "./pages/ProfilePage/ProfilePage.js";
import BoardDetail from "./components/Board/BoardDetail.js";
import DetailPage from "./pages/DetailPage/DetailPage.js";
import { useEffect } from "react";
export const PostsStateContext = React.createContext(); //posts 데이터 context

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const User = { id: "1@gmail.com", pw: "A!11111111" };
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
    // setLocalStrage();
  };
  useEffect(() => {
    getData();
  }, []);
  // return
  return (
    <>
      <PostsStateContext.Provider value={postList}>
        <Routes>
          <Route
            exact
            path="/"
            element={<Login User={User} setIsLogin={setIsLogin} />}
          />
          <Route exact path="/join" element={<Join />} />
          <Route
            exact
            path="/:board/*"
            element={
              <Home
                getData={getData}
                User={User}
                menus={menus}
                setIsLogin={setIsLogin}
                setPostList={setPostList}
              />
            }
          />
          <Route
            exact
            path="/:board/:no"
            element={
              <DetailPage postList={postList} menus={menus} User={User} />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <Profile menus={menus} User={User} setIsLogin={setIsLogin} />
            }
          />
        </Routes>
      </PostsStateContext.Provider>
    </>
  );
}

export default App;
