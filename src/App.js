import React, { useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login.js";
import "./App.css";
import Home from "./pages/HomePage/Home.js";
import Join from "./pages/JoinPage/Join.js";
import ProfilePage from "./pages/ProfilePage/ProfilePage.js";
import DetailPage from "./pages/DetailPage/DetailPage.js";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PostPage from "./pages/PostPage/PostPage.js";
export const PostsStateContext = React.createContext(); //posts 데이터 context

function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setuserInfo] = useState([]);
  // const User = {
  //   userId: 1,
  //   id: "1@gmail.com",
  //   pw: "A!11111111",
  //   name: "홍길동",
  //   email: "1@gmail.com",
  //   sex: "male",
  //   age: "2000-01-01",
  // };
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
  useEffect(() => {
    if (isLogin === false) {
      console.log(isLogin);
      setuserInfo([]);
      navigate("/");
    }
  }, [isLogin]);
  // return
  return (
    <>
      <PostsStateContext.Provider value={postList}>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Login setuserInfo={setuserInfo} setIsLogin={setIsLogin} />
            }
          />
          <Route exact path="/join" element={<Join />} />
          <Route
            exact
            path="/:board/*"
            element={
              <Home
                getData={getData}
                userInfo={userInfo}
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
              <DetailPage
                postList={postList}
                menus={menus}
                userInfo={userInfo}
              />
            }
          />
          <Route
            exact
            path="/profile"
            element={
              <ProfilePage
                menus={menus}
                userInfo={userInfo}
                setIsLogin={setIsLogin}
              />
            }
          />
          <Route
            exact
            path="/post"
            element={
              <PostPage
                menus={menus}
                userInfo={userInfo}
                setIsLogin={setIsLogin}
              />
            }
          />
        </Routes>
      </PostsStateContext.Provider>
    </>
  );
}

export default App;
