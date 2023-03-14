import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
// import TagInput from "react-tagsinput";
import Board from '../Board/Board';
import style from './Post.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { UserDataContext } from '../../App';
function PostForm({ getData, isEdit, originData }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const userInfo = useContext(UserDataContext);
  const { no } = useParams(); //글번호
  const navigate = useNavigate();

  useEffect(() => {
    if (isEdit) {
      setTitle(originData.title);
      setBody(originData.body);
    }
  }, [isEdit, originData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      window.confirm(
        isEdit ? '일기를 수정하시겠습니까?' : '새로운 일기를 작성하시겠습니까?',
      )
    ) {
      if (!isEdit) {
        try {
          const response = await axios.post(
            'http://localhost:8080/api-board/new',
            null,
            {
              params: {
                board_title: title,
                board_text: body,
                user_no: userInfo[0],
                user_name: userInfo[1],
              },
            },
          );
          console.log(response); //성공여부 판단
          getData();
          alert('글작성 성공');
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log(no, title, body, userInfo[0], userInfo[1]);
        try {
          const response = await axios.put(
            'http://localhost:8080/api-board/update',

            {
              params: {
                board_no: no,
                board_title: title,
                board_text: body,
                user_no: userInfo[0],
                user_name: userInfo[1],
              },
            },
          );
          console.log(response); //성공여부 판단
          alert('글수정 성공');
          getData();
        } catch (error) {
          console.log(error);
        }
      }
    }
    navigate('/board1', { replace: true });
  };

  return (
    <div className={style.BoardPost}>
      <Board>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="제목을 입력해주세요."
          />
          <CKEditor
            editor={ClassicEditor}
            data={body}
            onChange={(e, editor) => {
              const data = editor.getData();
              setBody(data);
            }}
          />
          <br />
          <button type="submit">글쓰기</button>
        </form>
      </Board>
    </div>
  );
}

export default PostForm;
