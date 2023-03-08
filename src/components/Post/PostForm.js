import React, { useState } from "react";
import axios from "axios";
// import TagInput from "react-tagsinput";
import Board from "../Board/Board";
import style from "./Post.module.css";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
function PostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  // const [tags, setTags] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      title: title,
      body: body,
      // tags: JSON.stringify(tags),
    };
    await axios.post("https://jsonplaceholder.typicode.com/posts", data);
    setTitle("");
    setBody("");
    // setTags([]);
    console.log(data);
  };

  return (
    <div className={style.BoardPost}>
      <Board>
        <h1>글 작성</h1>
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
          <button type="submit">Submit</button>
        </form>
      </Board>
    </div>
  );
}

export default PostForm;
