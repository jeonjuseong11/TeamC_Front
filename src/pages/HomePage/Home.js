import React, { useContext } from 'react';
import BoardList from '../../components/Board/BoardList';
import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import { GetDataContext, UserDataContext } from '../../App';
const Home = ({ menus, setIsLogin, setPostList }) => {
  const userInfo = useContext(UserDataContext);
  const getData = useContext(GetDataContext);

  // const setLocalStrage = () => {
  //   localStorage.setItem("postsInLocal", JSON.stringify(postList));
  // };
  return (
    <div
      style={{
        textAlign: 'center',
        height: '100vh',
      }}
    >
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} setIsLogin={setIsLogin} />
      <BoardList setPostList={setPostList} getData={getData} />
    </div>
  );
};

export default Home;
