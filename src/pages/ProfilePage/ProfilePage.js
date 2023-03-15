import React, { useContext, useEffect, useState } from 'react';
import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import profileImg from '../../assets/profile.png';
import style from './Profile.module.css';
import Board from '../../components/Board/Board';
import axios from 'axios';
import { UserDataContext } from '../../App';
const Profile = ({ menus, setIsLogin }) => {
  const userInfo = useContext(UserDataContext);
  const [profileUserInfo, setProfileUserInfo] = useState({
    id: '',
    email: '',
    sex: '',
    age: '',
  });
  async function getUserInfo() {
    try {
      const response = await axios.get('http://localhost:8080/api-user', {
        params: { user_no: userInfo[0] },
      });
      const profileData = response.data;
      setProfileUserInfo({
        id: profileData.user_id,
        email: profileData.user_email,
        sex: profileData.user_sex,
        age: profileData.user_age,
      });
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getUserInfo();
  }, []);
  return (
    <div>
      <Sidebar menus={menus} setIsLogin={setIsLogin} />
      <Top userInfo={userInfo} />
      <div className={style.Profile}>
        {/* <Board> */}
          <div className={style.userWrap}>
            <div className={style.userIcon}>
              <ul className={style.ProfileIcon}>
                <li>
                  <img className={style.Icon} src={profileImg} />
                </li>
                <li><h4>{userInfo[1]}</h4></li>
              </ul>
                <div className={style.userForm}>
                  <ul className={style.ImformationTitle}>
                    <li>
                      아이디
                    </li>
                    <li>
                      이메일
                    </li>
                    <li>
                      성별
                    </li>
                    <li>
                      생년월일
                    </li>
                  </ul>
                  <ul className={style.Imformation}>
                  <li>
                      {profileUserInfo.id}
                    </li>
                    <li>
                      {profileUserInfo.email}
                    </li>
                    <li>
                      {profileUserInfo.sex}
                    </li>
                    <li>
                      {profileUserInfo.age}
                    </li>
                  </ul>
                  </div>
          </div>
          <div className={style.aboutMe}>
              <h1>About Me!</h1>
            </div>
            </div>
        {/* </Board> */}
      </div>
    </div>
  );
};
export default Profile;
