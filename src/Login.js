import React, { useEffect, useState } from "react";

const Login = ({ setIsLogin, id, pw }) => {
  const [userId, setUserId] = useState("");
  const [userPw, setUserPw] = useState("");

  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [notAllow, setNotAllow] = useState(true);

  const handleId = (e) => {
    setUserId(e.target.value);
    const regex =
      /^(([^<>()\[\].,;:\s@"]+(\.[^<>()\[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/i;
    if (regex.test(id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  const handlePw = (e) => {
    setUserPw(e.target.value);
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
    if (userId === id && pw === pw) {
      alert("로그인 성공");
      setIsLogin(true);
    } else if (userId !== id && userPw === pw) {
      alert("아이디를 확인해주세요");
    } else if (userId === id && userPw !== pw) {
      alert("패스워드를 확인해주세요");
    } else {
      alert("가입자 정보가 없습니다.");
    }
  };

  return (
    <div className="Page">
      <div className="title">logo부분</div>

      <div className="contentWrap">
        <div className="id">
          <input
            type="text"
            value={id}
            onChange={handleId}
            placeholder="아이디를 입력해주세요"
          ></input>
          <div className="errMessgeId" onChange={handleId}>
            {!idValid && id.length > 0 && (
              <div>올바른 아이디를 입력해주세요</div>
            )}
          </div>
        </div>
        <div className="password">
          <input
            type="password"
            value={pw}
            onChange={handlePw}
            placeholder="패스워드를 입력해주세요"
          ></input>
        </div>
        <div className="errMessgePassword">
          {!pwValid && pw.length > 0 && (
            <div>올바른 패스워드를 입력해주세요</div>
          )}
        </div>
      </div>
      <div className="btnWrap">
        <button
          className="loginBtn"
          disabled={notAllow}
          onClick={onClickConfirmButton}
        >
          로그인
        </button>
      </div>
    </div>
  );
};

export default Login;
