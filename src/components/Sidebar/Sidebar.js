import React from "react";
import { Link, NavLink } from "react-router-dom";
import SidebarItem from "./SidebarItem";
import style from "./Sidebar.module.css";
import Logo from "../../assets/Logo.png";
function Sidebar({ menus }) {
  return (
    <div className={style.Side}>
      <Link to="/board1">
        <img className={style.Logo} src={Logo} />
      </Link>

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
