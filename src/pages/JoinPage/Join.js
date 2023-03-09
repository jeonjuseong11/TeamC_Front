import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Join.css";
import axios from "axios";

const Join = () => {
  // 계정 배열 초기값
  const [account, setAccount] = useState({
    id: "",
    pw: "",
    pwRewind: "",
    name: "",
    email: "",
    sex: "",
    age: 0,
  });

  // 유효성 검사를 위한 상태
  const [idValid, setIdValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);
  const [pwRewindValid, setPwRewindValid] = useState(false);
  const [nameValid, setNameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [ageValid, setAgeValid] = useState(false);

  useEffect(() => {
    if (account.pw === account.pwRewind) {
      setPwRewindValid(true);
    } else {
      setPwRewindValid(false);
    }
  }, [account]);
  //변화상황을 빠르게 적용하기 위해 useeffect를 이용해 account가 변하면 적용되게함
  //그중에 pwRewind가 늦게 작동하기 때문에 안에 넣음

  // 아이디 제한
  const handleId = (e) => {
    const inputIdValue = e.target.value;
    setAccount({ ...account, id: inputIdValue });
    const regex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    //이메일 형식이 만족하지 않으면 setIdVaild가 false
    if (regex.test(account.id)) {
      setIdValid(true);
    } else {
      setIdValid(false);
    }
  };

  // 비밀번호 제한
  const handlePw = (e) => {
    const inputPwValue = e.target.value;
    setAccount({ ...account, pw: inputPwValue });
    const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
    if (regex.test(account.pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  // 비밀번호 확인 제한
  const handlePwRewind = (e) => {
    const inputPwRewindValue = e.target.value;
    setAccount({ ...account, pwRewind: inputPwRewindValue });
  };

  // 이름 제한
  const handleName = (e) => {
    const inputNameValue = e.target.value;
    setAccount({ ...account, name: inputNameValue });
    if (account.name === "") {
      setNameValid(false);
    } else {
      setNameValid(true);
    }
  };

  // 이메일 제한
  const handleEmail = (e) => {
    const inputEmailValue = e.target.value;
    setAccount({ ...account, email: inputEmailValue });
    const regex =
      /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
    if (regex.test(account.email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };

  // 성별 설정
  const onSexClick = (e) => {
    const inputSexValue = e.target.value;
    setAccount({ ...account, sex: inputSexValue });
  };

  // 나이(생년월일) 제한
  const handleAge = (e) => {
    const inputAgeValue = e.target.value;
    if (account.age !== null) {
      setAgeValid(true);
      setAccount({ ...account, age: inputAgeValue });
    } else {
      setAgeValid(false);
    }
  };

  async function joinFunc() {
    try {
      const response = await axios.post("http://localhost:8080/api-user/new", {
        user_id: account.id,
        user_pw: account.pw,
        user_name: account.name,
        user_email: account.email,
        user_sex: account.sex,
        user_age: account.age,
      });
      console.log(response);
      console.log(response.data);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // 이벤트 발생시 이전 페이지로 이동
  const navigate = useNavigate();
  const backToList = () => {
    navigate(-1);
  };

  return (
    <div className="Join">
      <div className="container">
        <p>아이디</p>
        <input
          id="id"
          name="id"
          type="text"
          value={account.id}
          placeholder="아이디를 적어주세요"
          onChange={handleId}
          style={
            account.id.length === 0
              ? { border: "solid 1px black" }
              : idValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <p>패스워드</p>
        <input
          id="pw"
          name="pw"
          type="password"
          maxLength="12"
          value={account.pw}
          placeholder="영대소문자, 특수기함 포함 8자 이상"
          onChange={handlePw}
          style={
            account.pw.length === 0
              ? { border: "solid 1px black" }
              : pwValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <p>패스워드 재확인</p>
        <input
          id="pwRewind"
          name="pwRewind"
          type="password"
          maxLength="12"
          value={account.pwRewind}
          onChange={handlePwRewind}
          style={
            account.pwRewind.length === 0
              ? { border: "solid 1px black" }
              : pwRewindValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <p>이름</p>
        <input
          id="userName"
          name="userName"
          type="text"
          value={account.name}
          placeholder="이름을 적어주세요"
          onChange={handleName}
          maxLength="5"
          style={
            account.name.length === 0
              ? { border: "solid 1px black" }
              : nameValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <p>이메일</p>
        <input
          id="email"
          name="email"
          type="text"
          value={account.email}
          placeholder="이메일을 적어주세요"
          onChange={handleEmail}
          style={
            account.email.length === 0
              ? { border: "solid 1px black" }
              : emailValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <p>성별</p>
        <div>
          <div className="radio-btn">
            <div className="female-radio">
              <input
                type="radio"
                name="sex"
                id="sex"
                value="female"
                onClick={onSexClick}
              />
              <label>여성</label>
            </div>
            <div className="male-radio">
              <input
                type="radio"
                name="sex"
                id="sex"
                value="male"
                onClick={onSexClick}
              />
              <label>남성</label>
            </div>
          </div>
        </div>
        <p>생년월일</p>
        <input
          id="age"
          name="age"
          type="number"
          value={account.age}
          onChange={handleAge}
          style={
            account.age === 0
              ? { border: "solid 1px black" }
              : ageValid
              ? { border: "solid 1px green" }
              : { border: "solid 1px red" }
          }
        />
        <div className="form-btn">
          <button className="create-btn" type="submit" onClick={joinFunc}>
            생성
          </button>
          <button className="back-btn" onClick={backToList}>
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default Join;
