import React, { useEffect, useState } from "react";
import "./Login.css";
import Join from "./Join";

const User = { id: "1@gmail.com", pw: "A!11111111" };

const Login = ({ setIsLogin}) => {
  const [isJoin, setIsJoin] = useState(false);

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
      setIsLogin(true);
    } else if (id !== User.id && pw === User.pw) {
      alert("아이디를 확인해주세요");
    } else if (id === User.id && pw !== User.pw) {
      alert("패스워드를 확인해주세요");
    } else {
      alert("가입자 정보가 없습니다.");
    }
  };

  const onJoin = () => {
    setIsJoin(true);
  }

  return isJoin ? <Join 
  setIsJoin = {setIsJoin}
  /> : (
    <div className="Page">
      <div className="title">logo부분</div>
        <div className="contentWrap">
          <div className="id">
            <p>아이디</p>
            <input
              type="text"
              value={id}
              onChange={handleId}
              placeholder="아이디를 입력해주세요"
            ></input>
            <div className="errMessgeId" onChange={handleId}>
              {!idValid && id.length > 0 && (
                <p style={idValid ? {color:"green"} : {color:"red"}}>올바른 아이디를 입력해주세요</p>
              )}
            </div>
          </div>
          <div className="password">
          <p>비밀번호</p>
            <input
              type="password"
              value={pw}
              onChange={handlePw}
              placeholder="패스워드를 입력해주세요"
            ></input>
          </div>
          <div className="errMessgePassword">
            {!pwValid && pw.length > 0 && (
              <p style={pwValid ? {color:"green"} : {color:"red"}}>올바른 패스워드를 입력해주세요</p>
            )}
          </div>
          <div className="btnWrap">
          <button
            className="loginBtn"
            disabled={notAllow}
            onClick={onClickConfirmButton}
          >
            로그인
          </button>
          <button
          onClick = {onJoin}
          >회원가입</button>
        </div>
      </div>
    </div>
  );
};

export default Login;