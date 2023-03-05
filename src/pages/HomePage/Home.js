import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import BoardDetail from "../../components/Board/BoardDetail";
import BoardList from "../../components/Board/BoardList";
import Sidebar from "../../components/Sidebar/Sidebar";
import Profile from "../ProfilePage/ProfilePage";
import Top from "../../components/Top/Top";
import { useContext } from "react";
import PostsStateContext from "../../App";
const Home = ({ User, menus, setIsLogin, getData, setPostList }) => {
  const postList = useContext(PostsStateContext);

  // const setLocalStrage = () => {
  //   localStorage.setItem("postsInLocal", JSON.stringify(postList));
  // };

  //새글 작성
  const onCreate = (userId, title, content, id) => {
    const created_date = new Date().getTime();
    const newItem = {
      userId,
      title,
      content,
      created_date,
      no: id, //1이라는 값을 가르킴
    };
    id.current += 1; //다음 일기 id를 위해 id를 1추가함
    setPostList([...postList, newItem]); //기존 배열 앞에 새로운 아이템을 추가
  };

  return (
    <div
      style={{
        textAlign: "center",
        height: "100vh",
      }}
    >
      <Top User={User} setIsLogin={setIsLogin} />
      <Sidebar menus={menus} />
      <BoardList setPostList={setPostList} getData={getData} />
    </div>
  );
};

export default Home;
