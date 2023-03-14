import React from 'react';
import { useLocation, Link, useParams } from 'react-router-dom';
import style from '../Top/Top.module.css';
import profileImg from '../../assets/profile.png';

const Top = ({ userInfo, setIsLogin }) => {
  const board = useParams();
  const location = useLocation();
  //제목 변환
  const titlePick = () => {
    // console.log(location); 위치 확인용
    if (location.pathname === `/board1/${board.no}`) {
      return '자유 게시판';
    } else if (location.pathname === `/board2/${board.no}`) {
      return '비밀 게시판';
    } else if (location.pathname === '/profile') {
      return 'Profile';
    } else if (location.pathname === '/board2') {
      return '비밀 게시판';
    } else if (location.pathname === '/board1') {
      return '자유 게시판 ';
    } else if (location.pathname === `/${board.board}/post`) {
      return '글 작성 ';
    }
  };

  return (
    <div className={style.Top}>
      <h2>{titlePick()}</h2>
      <ul>
        <Link to={'/profile'}>
          <li>
            <span>{userInfo[1]}</span>
            <span> 님, 반갑습니다</span>
          </li>
          <li>
            <img src={profileImg} />
          </li>
        </Link>
      </ul>
    </div>
  );
};

export default Top;
