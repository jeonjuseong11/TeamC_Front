import React, { useState } from "react";
import { Route } from "react-router-dom";
import { Routes } from "react-router-dom";
import Login from "./Login";
import Profile from "./pages/Profile/Profile";
import "./App.css";
import Home from "./pages/Home/Home.js";

function App() {
  const [isLogin, setIsLogin] = useState(false);
  const User = { id: "1@gmail.com", pw: "A!11111111" };
  const menus = [
    { name: "자유게시판", path: "/board1" },
    { name: "비밀게시판", path: "/board2" },
  ];
  // return
  return (
    <Routes>
      <Route exact path="*" element={<Home User={User} menus={menus} />} />
      <Route exact path="/login" element={<Login User={User} />} />
    </Routes>
    // </div>
  );
}

export default App;
