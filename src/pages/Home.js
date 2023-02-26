import React from "react";
import { Route, Routes } from "react-router-dom";
import BoardList from "../component/Board/BoardList";
import Sidebar from "../component/Sidebar";
import Profile from "./Profile";
const Home = () => {
  return (
    <div style={{ textAlign: "center", height: "100vh", overflow: "hidden" }}>
      <Sidebar />
      <Routes>
        <Route path="/" element={<BoardList />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </div>
  );
};

export default Home;
