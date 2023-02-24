import React from "react";
import { NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import Logo from "../assets/Logo.png";
import style from "./Sidebar.module.css";

function Sidebar() {
  const menus = [
    { name: "자유게시판", path: "/board1" },
    { name: "비밀게시판", path: "/board2" },
  ];

  return (
    <div className={style.Side}>
      <img className={style.Profile} src={Logo} />
      <div className={style.Menu}>
        {menus.map((menu, index) => {
          return (
            <NavLink
              style={{ color: "gray", textDecoration: "none" }}
              to={menu.path}
              key={index}
            >
              <SidebarItem
                menu={menu}
                // 현재 URL pathname과 객체에 담긴 path값 일치 여부 확인
              />
            </NavLink>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;
