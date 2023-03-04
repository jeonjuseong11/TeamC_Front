import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Top from "../../components/Top/\bTop";
import style from "./Profile.module.css";
const Profile = ({ menus, User, setIsLogin }) => {
  return (
    <div className={style.Profile}>
      <Sidebar menus={menus} />
      <Top User={User} setIsLogin={setIsLogin} />
    </div>
  );
};
export default Profile;
