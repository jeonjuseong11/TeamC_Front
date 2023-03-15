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
      setBody(originData.content);
    }
  }, [isEdit, originData]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title.length == 0 && body.length == 0) {
      alert('빈칸을 채워주세요');
    } else {
      if (
        window.confirm(
          isEdit
            ? '일기를 수정하시겠습니까?'
            : '새로운 일기를 작성하시겠습니까?',
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
          try {
            const response = await axios.put(
              'http://localhost:8080/api-board/update',
              null,
              {
                params: {
                  board_no: originData.board_no,
                  board_title: title,
                  board_text: body,
                  user_no: userInfo[0],
                  user_name: userInfo[1],
                },
              },
            );
            console.log(response); //성공여부 판단
            getData();
            alert('글수정 성공');
          } catch (error) {
            console.log(error);
          }
        }
      }
      navigate('/board1', { replace: true });
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
          <button
            type="button"
            onClick={() => {
              navigate(-1);
            }}
          >
            취소
          </button>
          <button type="submit">글쓰기</button>
        </form>
      </Board>
    </div>
  );
}

export default PostForm;
