import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import style from "./Board.module.css";
import BoardItem from "./BoardItem";
const BoardList = () => {
  const [datas, setDatas] = useState([]);
  const dataNo = useRef(1);
  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 20).map((it) => {
      return {
        title: it.name,
        content: it.body,
        created_date: new Date().getTime(),
        no: dataNo.current++,
      };
    });
    setDatas(initData);
  };

  useEffect(() => {
    getData();
  }, []);

  const onCreate = (title, content) => {
    const created_date = new Date().getTime();
    const newItem = {
      title,
      content,
      created_date,
      no: dataNo.current, //1이라는 값을 가르킴
    };
    dataNo.current += 1; //다음 일기 id를 위해 id를 1추가함
    setDatas([...datas, newItem]); //기존 배열 앞에 새로운 아이템을 추가
  };
  return (
    <div className={style.BoardList}>
      <div>
        <input type="text" className={style.tagInput} placeholder="태그" />
        <input
          type="text"
          className={style.nameInput}
          placeholder="게시물 명"
        />
        <button className={style.searchBtn}>Search</button>
      </div>
      <div className={style.info}>
        <h2>게시판</h2>
        <h4>{datas.length}개의 글이 있습니다.</h4>
      </div>

      <div>
        <>
          {datas.map((it) => (
            <BoardItem key={it.no} {...it} />
          ))}
        </>
      </div>
    </div>
  );
};
export default BoardList;
