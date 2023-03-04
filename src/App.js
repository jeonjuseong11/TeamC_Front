import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/LoginPage/Login.js";
import "./App.css";
import Home from "./pages/HomePage/Home.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const User = { id: "1@gmail.com", pw: "A!11111111" };
  const menus = [
    { name: "자유게시판", path: "/board1" },
    { name: "비밀게시판", path: "/board2" },
  ];

  // return
  return (
    // <Home User={User} menus={menus} /> 테스트용
    <>
      {isLogin ? (
        <Home User={User} menus={menus} setIsLogin={setIsLogin} />
      ) : (
        <Login User={User} setIsLogin={setIsLogin} />
      )}
      <Routes>
        <Route exact path="/" element={<Home User={User} menus={menus} />} />
        <Route
          exact
          path="/login"
          element={<Login User={User} setIsLogin={setIsLogin} />}
        />
      </Routes>
    </>
  );
}

export default App;
