import React from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import SidebarItem from './SidebarItem';
import style from './Sidebar.module.css';
import Logo from '../../assets/Logo.png';
import loouticon from '../../assets/logouticon.png';

function Sidebar({ menus, setIsLogin }) {
  const navigate = useNavigate();
  const logout = () => {
    navigate('/');
    setIsLogin(false);
  };
  return (
    <div className={style.Side}>
      <div className={style.Logo}>
        <Link to="/board1">
          <p>Logo</p>
        </Link>
      </div>
      <div className={style.Menu}>
        {menus.map((menu, index) => {
          return (
            <NavLink to={menu.path} key={index}>
              <SidebarItem
                menu={menu}
                // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
              />
            </NavLink>
          );
        })}
        <NavLink to="/" onClick={logout}>
          <p>
            <img src={loouticon} className={style.logoutIcon} />
            로그아웃
          </p>
        </NavLink>
      </div>
    </div>
  );
}

export default React.memo(Sidebar);
