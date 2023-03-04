import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login.js";
import "./App.css";
import Home from "./pages/HomePage/Home.js";
import Join from "./pages/JoinPage/Join.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const User = { id: "1@gmail.com", pw: "A!11111111" };
  const menus = [
    { name: "자유게시판", path: "/home/board1" },
    { name: "비밀게시판", path: "/home/board2" },
  ];

  // return
  return (
    // <Home User={User} menus={menus} /> 테스트용
    <>
      <Routes>
        <Route
          exact
          path="/"
          element={<Login User={User} setIsLogin={setIsLogin} />}
        />
        <Route exact path="/join" element={<Join />} />
        <Route
          exact
          path="/home"
          element={<Home User={User} menus={menus} setIsLogin={setIsLogin} />}
        />
      </Routes>
      {isLogin ? (
        <Home User={User} menus={menus} setIsLogin={setIsLogin} />
      ) : (
        <Login User={User} setIsLogin={setIsLogin} />
      )}
    </>
  );
}

export default App;
