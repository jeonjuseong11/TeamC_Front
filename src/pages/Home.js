import React from "react";
import BoardList from "../component/Board/BoardList";
import Sidebar from "../component/Sidebar";
const Home = () => {
  return (
    <div>
      <Sidebar />
      <BoardList />
    </div>
  );
};

export default Home;
