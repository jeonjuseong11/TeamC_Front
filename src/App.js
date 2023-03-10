import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import Login from './pages/LoginPage/Login.js';
import './App.css';
import Home from './pages/HomePage/Home.js';
import Join from './pages/JoinPage/Join.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import DetailPage from './pages/DetailPage/DetailPage.js';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import PostPage from './pages/PostPage/PostPage.js';
import axios from 'axios';
export const PostsStateContext = React.createContext(); //posts 데이터 context
export const UserDataContext = React.createContext();
function App() {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setuserInfo] = useState([]);

  const menus = [
    { name: '자유게시판', path: '/board1' },
    { name: '비밀게시판', path: '/board2' },
  ];
  const [postList, setPostList] = useState([]);
  async function getData() {
    try {
      const response = await axios.get('http://localhost:8080/api-board');
      const initData = response.data.map((it) => {
        return {
          no: it.board_no,
          title: it.board_title,
          content: it.board_text,
          userId: it.user_name,
          created_date: it.regdate,
        };
      });
      setPostList(initData);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getData();
    const intervalId = setInterval(getData, 5000); // 새로운 글을 알아보기 위해 5초마다 데이터 가져오기
    return () => clearInterval(intervalId);
  }, []);
  useEffect(() => {
    if (isLogin === false) {
      console.log(isLogin);
      setuserInfo([]);
      navigate('/');
    }
    getData();
  }, [isLogin]);
  // return
  return (
    <>
      <UserDataContext.Provider value={userInfo}>
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
      </UserDataContext.Provider>
    </>
  );
}

export default App;
