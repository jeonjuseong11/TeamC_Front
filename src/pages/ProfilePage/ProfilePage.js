import React from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import Top from "../../components/Top/Top";
import MyBoardList from "../../components/MyBoard/MyBoardList"
import profileImg from "../../assets/profile.png";
import style from "./Profile.module.css";
const Profile = ({ menus, User, setIsLogin }) => {
  return (
    <div>
      <Sidebar menus={menus} />
      <Top User={User} setIsLogin={setIsLogin} />
      <div className={style.Profile}>
        <div className={style.USerForm}>
          <div className={style.UserIcon}>
            <ul>
              <li>
                <img className={style.Icon} src={profileImg} />
              </li>
              <li>{User.name}</li>
            </ul>
          </div>
          <div className={style.UserImformation}>
            <ul>
              <li>아이디 : {User.id}</li>
              <li>이메일 : {User.email}</li>
              <li>성별 : {User.sex}</li>
              <li>생년월일 : {User.age}</li>
            </ul>
          </div>
        </div>
        {/* <div className={style.UserSns}>
        // sns주소 바로가기버튼 추후 추가 예정
      </div> */}
        <div className={style.MyPostList}>
          <div className={style.MyCreatedList}>
            <MyBoardList />
          </div>
          {/* <div className={style.CommentedPostList}>
        // 댓글쓴 글 표시창 추후 추가 예정
        </div> */}
        </div>
      </div>
    </div>
  );
};
export default Profile;
