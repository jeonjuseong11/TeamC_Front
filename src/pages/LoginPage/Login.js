import React, { useState } from 'react';
import '../LoginPage/Login.css';
import { useNavigate, Link } from 'react-router-dom';
import emailImg from '../../assets/email.png';
import passwordImg from '../../assets/password.png';
import Logo from '../../assets/Logo.png';
import axios from 'axios';

const Login = ({ setIsLogin, setuserInfo }) => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate('/board1');
  };
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');

  const handleId = (e) => {
    setId(e.target.value);
  };

  const handlePw = (e) => {
    setPw(e.target.value);
  };

  async function loginFunc() {
    try {
      setIsLogin(true);
      const response = await axios.get('http://localhost:8080/api-login', {
        params: { user_id: id },
      });
      // console.log(response.data);
      const logindata = response.data;
      if (logindata != null) {
        if (logindata.user_pw === pw) {
          setuserInfo([logindata.user_no, logindata.user_name]);
          setIsLogin(true);
          alert('로그인 성공');
          toHome();
        }
      } else {
        alert('가입자 정보가 없습니다.');
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="loginPage">
      <div className="loginWrap">
        <div className="login-logo">
          <img src={Logo} alt="logo" />
        </div>
        <div className="login-header">
          <h1>Sign In</h1>
          <div>서비스를 이용하려면 로그인이 필요합니다.</div>
        </div>
        <form className="login-form">
          <div className="form-id">
            <img className="form-icon" src={emailImg} />
            <input
              type="text"
              value={id}
              onChange={handleId}
              placeholder="이메일을 입력해주세요"
              maxLength="12"
            />
          </div>
          <div className="form-password">
            <img className="form-icon" src={passwordImg} />
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              placeholder="비밀번호를 입력해주세요"
            />
          </div>
          <div className="form-check">
            <div className="checkbox">
              <input type="checkbox" id="rememberMeCheckbox" />
              <label htmlFor="rememberMeCheckbox">Remember me</label>
            </div>
            <a href="#">I forgot my password!</a>
          </div>
          <button type="button" className="loginBtn" onClick={loginFunc}>
            로그인
          </button>
        </form>
        <div className="login-footer">
          Don't have an account? <Link to="/join">Create a free account.</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
