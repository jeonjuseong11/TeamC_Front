import React, { useEffect, useState } from "react";
import joinstyle from "./Join.css";
import { Route, Routes, Link } from "react-router-dom";
import Login from "../LoginPage/Login";

const Join = () => {
    // 계정 배열 초기값
    const [account, setAccount] = useState([
      {
        id : "",
        pw : "",
        name : "",
        email : "",
        sex : "",
        age: ""
    }
    ]);

    // 초기값 세팅 - 아이디, 패스워드, 패스워드확인, 이름, 이메일, 성별, 나이(생년월일)
    const [id, setId] = useState("");
    const [pw, setPw] = useState("");
    const [pwRewind, setPwRewind] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [sex, setSex] = useState("");
    const [age, setAge] = useState("");

    // 유효성 검사
    const [idValid, setIdValid] = useState(false);
    const [pwValid, setPwValid] = useState(false);
    const [pwRewindValid, setPwRewindValid] = useState(false);
    const [nameValid, setNameValid] = useState(false);
    const [emailValid, setEmailValid] = useState(false);
    const [sexValid, setSexValid] = useState(false);
    const [ageValid, setAgeValid] = useState(false);
    const [isJoin, setIsJoin] = useState(false);

    // 아이디 동기 처리
    useEffect(()=>{
      const regex = /^[a-zA-z0-9]{4,12}$/
      if(id.length === 0){
      }else{
        if (regex.test(id)) {
          setIdValid(true);
        } else {
          setIdValid(false);
        }
      }
    },[id])

    // 아이디 제한
    const handleId = (e) => {
      const inputIdValue = e.target.value
        setId(inputIdValue);
        setAccount([{
          id: inputIdValue
        }])

        const regex = /^[a-zA-z0-9]{4,12}$/
        if (regex.test(id)) {
          setIdValid(true);
        } else {
          setIdValid(false);
        }
      };
      
      // 비밀번호 동기 처리
      useEffect(()=>{
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
        if(pw.length === 0){
      }else{
        if (regex.test(pw)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      }
      },[pw])


      // 비밀번호 제한
      useEffect(() => {},[]);
      const handlePw = (e) => {
        const inputPwValue = e.target.value
        setPw(inputPwValue);
        setAccount([{
          pw: inputPwValue
        }])
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
        if (regex.test(pw)) {
          setPwValid(true);
        } else {
          setPwValid(false);
        }
      };

      // 비밀번호 재확인 동기 처리
      useEffect(()=>{
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
        if(pwRewind.length === 0){
      }else{
        if (regex.test(pwRewind) && pwRewind === pw) {
          setPwRewindValid(true);
        } else {
          setPwRewindValid(false);
        }
      }
      },[pwRewind])

      // 비밀번호 확인 제한
      const handlePwRewind = (e) => {
        setPwRewind(e.target.value);
        if (pwRewind === pw) {
            setPwRewindValid(true);
        } else {
            setPwRewindValid(false);
        }
      };

      // 이름 동기 처리
      useEffect(()=>{
        const regex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,12}$/;
        if(name.length === 0){
      }else{
        if (regex.test(pw)) {
          setNameValid(true);
        } else {
          setNameValid(false);
        }
      }
      },[name])
    
      // 이름 제한
      const handleName = (e) => {
        const inputNameValue = e.target.value
        setName(inputNameValue);
        setAccount([{
          name: inputNameValue
        }])
        // const {name, value} = e.target
        // setInputs({
        //   ...inputs,
        //   [name] : value
        // })
        if (name==="") {
            setNameValid(false);
        } else {
            setNameValid(true);
        }
      };

      // 이메일 동기 처리
      useEffect(()=>{
        const regex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(email.length === 0){
      }else{
        if (regex.test(email)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      }
      },[email])

      // 이메일 제한
      const handleEmail = (e) => {
        const inputEmailValue = e.target.value
        setEmail(inputEmailValue);
        setAccount([{
          email: inputEmailValue
        }])
        const regex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if (regex.test(email)) {
            setEmailValid(true);
        } else {
            setEmailValid(false);
        }
      };

// 이메일 동기 처리
      useEffect(()=>{
        const regex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(email.length === 0){
      }else{
        if (regex.test(email)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      }
      },[email])

      // 성별 동기 처리
      useEffect(()=>{
        const regex = /^[A-Za-z0-9_]+[A-Za-z0-9]*[@]{1}[A-Za-z0-9]+[A-Za-z0-9]*[.]{1}[A-Za-z]{1,3}$/;
        if(email.length === 0){
      }else{
        if (regex.test(email)) {
          setEmailValid(true);
        } else {
          setEmailValid(false);
        }
      }
      },[sex])

      // 성별 설정
      const onSexClick = (e) =>{
        const inputSexValue = e.target.value
        setSex(inputSexValue); 
        setAccount([{
          sex: inputSexValue 
        }])
      }

      // 나이(생년월일) 동기 처리
      useEffect(()=>{
        if(age.length === 0){
        }else{
        if(age.length === 8){
          setAgeValid(true);
      }else{
        setAgeValid(false);
        }
      }
      },[age])

      // 나이(생년월일) 제한
      const handleAge = (e) => {
        const inputAgeValue = e.target.value
        setAge(inputAgeValue);
        if (age.length === 8) {
            setAgeValid(true);
        setAge(inputAgeValue);
        setAccount([{
          age: inputAgeValue
        }])
        } else {
            setAgeValid(false);
        }
      };

      // 계정 배열에 값 insert
    const onCreate = () => {
        if(id === "" || pw ==="" || pwRewind === "" || name === "" || email === "" || age ===""){
            alert("공란을 확인해주세요");
        }else{if(!idValid || !pwValid || !pwRewindValid || !nameValid || !emailValid || !ageValid){
          alert("정확한 정보를 기입해주세요")
         }else{
            alert("회원가입이 완료되었습니다.");
            setIsJoin(false)
          }
        }
    }
    
    const onReset = () =>{
      setId("");
      setPw("");
      setPwRewind("");
      setName("");
      setEmail("");
      setAge("");
    }

    return(
        <div className="Join">
            <div className="container">
                  <p>아이디</p>
                <input 
                        id = "id"
                        name = "id"
                        type="text"
                        value={id}
                        placeholder="아이디를 적어주세요"
                        onChange={handleId}
                        style={id.length === 0 ? {border : "solid 1px black"} : idValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                        />
                  <p>패스워드</p>
                  <input
                            id = "pw"
                            name = "pw"
                            type="password"
                            value={pw}
                            placeholder="영대소문자, 특수기함 포함 8자 이상"
                            onChange={handlePw}
                            style={pw.length === 0 ? {border : "solid 1px black"} : pwValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                            />
                <p>패스워드 재확인</p>
                <input
                                id = "pwRewind"
                                name = "pwRewind"
                                type="password"
                                value={pwRewind}
                                onChange={handlePwRewind}
                                style={pwRewind.length === 0 ? {border : "solid 1px black"} : pwRewindValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                                />
                <p>이름</p>
                <input
                        id = "userName"
                        name = "userName"
                        type="text"
                        value={name}
                        placeholder="이름을 적어주세요"
                        onChange={handleName}
                        style={name.length === 0 ? {border : "solid 1px black"} : nameValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                        />
                <p>이메일</p>
                <input
                            id = "email"
                            name = "email"
                            type="text"
                            value={email}
                            placeholder="이메일을 적어주세요"
                            onChange={handleEmail}
                            style={email.length === 0 ? {border : "solid 1px black"} : emailValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                            />
                          <p>성별</p>
                          <div className = "radio-btn">
                          <input type='radio'
                            name='sex'
                            id = "sex" 
                            value='female' 
                            onClick={onSexClick}/>
                            <label>여성</label>
                      <input type='radio' 
                            name='sex'
                            id = "sex" 
                            value='male' 
                            onClick={onSexClick}/>
                            <label>남성</label>
                      <div id='result'></div>
              </div>
            <p>생년월일</p>
                <input
                            id = "age"
                            name = "age"
                            type="number"
                            value={age}
                            placeholder="ex)20080101"
                            onChange={handleAge}
                            style={age.length === 0 ? {border : "solid 1px black"} : ageValid ? {border : "solid 1px green"} : {border : "solid 1px red"}}
                            />
                            <div className="form-btn">
                              <Link to = "/login">
                <button
                className="create-btn"
                type = "submit"
                onClick={onCreate}
                >생성</button>
                </Link>
                <button
                className="reset-btn"
                type= "reset"
                onClick={onReset}
                >초기화</button>
                </div>
            </div>
        </div>
    )
}

export default Join;