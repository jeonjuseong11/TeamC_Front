import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';

import Login from './pages/LoginPage/Login.js';
import Home from './pages/HomePage/Home.js';
import Join from './pages/JoinPage/Join.js';
import ProfilePage from './pages/ProfilePage/ProfilePage.js';
import DetailPage from './pages/DetailPage/DetailPage.js';
import PostPage from './pages/PostPage/PostPage.js';

import axios from 'axios';
import EditPage from './pages/EditPage/EditPage';

export const PostsStateContext = React.createContext(); //posts 데이터 context
export const GetDataContext = React.createContext(); //getData context
export const UserDataContext = React.createContext(); //User 데이터 context
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
      const response = await axios.get('http://localhost:8080/api-board/list');
      const initData = response.data.map((it, idx) => {
        return {
          no: ++idx,
          title: it.board_title,
          content: it.board_text,
          userId: it.user_name,
          create_dt: it.create_dt,
          update_dt: it.update_dt,
          board_no: it.board_no,
        };
      });

      setPostList(initData.reverse());
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    // setIsLogin(window.localStorage.getItem('login'));
    console.log(isLogin);
    if (isLogin === false) {
      console.log(isLogin);
      setuserInfo([]);
      navigate('/login');
    } else {
    }
  }, [isLogin, postList]);
  useEffect(() => {
    getData();
  }, []);
  // return
  return (
    <>
      <UserDataContext.Provider value={userInfo}>
        <PostsStateContext.Provider value={postList}>
          <GetDataContext.Provider value={getData}>
            <Routes>
              <Route
                exact
                path="/login"
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
                    menus={menus}
                    setIsLogin={setIsLogin}
                    setPostList={setPostList}
                  />
                }
              />
              <Route
                exact
                path="/:board/:no"
                element={<DetailPage menus={menus} />}
              />
              <Route
                exact
                path="/profile"
                element={<ProfilePage menus={menus} setIsLogin={setIsLogin} />}
              />
              <Route
                exact
                path="/:board/post"
                element={<PostPage menus={menus} setIsLogin={setIsLogin} />}
              />
              <Route
                exact
                path="/:board/:no/edit"
                element={<EditPage menus={menus} setIsLogin={setIsLogin} />}
              />
            </Routes>
          </GetDataContext.Provider>
        </PostsStateContext.Provider>
      </UserDataContext.Provider>
    </>
  );
}

export default App;
