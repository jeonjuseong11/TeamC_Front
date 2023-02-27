import React from "react";
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
  return (
    <div style={{ textAlign: "center", height: "100vh", overflow: "hidden" }}>
      <Sidebar menus={menus} />
      <Routes>
        <Route exact path="/board1/*" element={<BoardList id={id} />} />
        <Route
          exact
          path="/board2"
          element={<BoardList id={id} menus={menus.name} />}
        />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/board/:no" element={<BoardDetail />} />
      </Routes>
    </div>
  );
};

export default Home;
