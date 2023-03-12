import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
// import TagInput from "react-tagsinput";
import Board from '../Board/Board';
import style from './Post.module.css';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
function PostForm({ userInfo, getData }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
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
      navigate('/board1');
      alert('글작성 성공');
      getData();
    } catch (error) {
      console.log(error);
    }
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
