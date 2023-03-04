import React, { useEffect, useState } from "react";
import "../LoginPage/Login.css";
import Join from "../JoinPage/Join";
import { useNavigate } from "react-router-dom";
import emailImg from "../../assets/email.png";
import passwordImg from "../../assets/password.png";
import { Link } from "react-router-dom";
import Logo from "../../assets/Logo.png";

const Login = ({ setIsLogin, User }) => {
  const navigate = useNavigate();
  const toHome = () => {
    navigate("/board1");
  };
  const toJoin = () => {
    navigate("/join");
  };
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e) => {
    setId(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePw = (e) => {
    setPw(e.target.value);
    const regex =
      /^(?=.*[a-zA-z])(?=.*[0-9])(?=.*[$`~!@$!%*#^?&\\(\\)\-_=+])(?!.*[^a-zA-z0-9$`~!@$!%*#^?&\\(\\)\-_=+]).{8,20}$/;
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  useEffect(() => {
    if (idValid && pwValid) {
      setNotAllow(false);
      return;
    }
    setNotAllow(true);
  }, [idValid, pwValid]);

  const onClickConfirmButton = () => {
    if (id === User.id && pw === User.pw) {
      alert("로그인 성공");
      toHome();
      setIsLogin(true);
    } else if (id !== User.id && pw === User.pw) {
      alert("아이디를 확인해주세요");
    } else if (id === User.id && pw !== User.pw) {
      alert("패스워드를 확인해주세요");
    } else {
      alert("가입자 정보가 없습니다.");
    }
  };

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
              type="email"
              value={id}
              onChange={handleId}
              placeholder="이메일을 입력해주세요"
              style={
                !idValid && id.length === 0
                  ? { border: "solid 1px black" }
                  : idValid
                  ? { border: "solid 1px green" }
                  : { border: "solid 1px red" }
              }
            />
          </div>
          <div className="form-password">
            <img className="form-icon" src={passwordImg} />
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              placeholder="비밀번호를 입력해주세요"
              style={
                pw.length === 0
                  ? { border: "solid 1px black" }
                  : pwValid
                  ? { border: "solid 1px green" }
                  : { border: "solid 1px red" }
              }
            />
          </div>
          <div className="form-check">
            <div className="checkbox">
              <input type="checkbox" id="rememberMeCheckbox" />
              <label htmlFor="rememberMeCheckbox">Remember me</label>
            </div>
            <a href="#">I forgot my password!</a>
          </div>
          <button
            type="submit"
            className="loginBtn"
            disabled={notAllow}
            onClick={onClickConfirmButton}
          >
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
