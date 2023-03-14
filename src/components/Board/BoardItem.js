import axios from 'axios';
import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserDataContext } from '../../App';

const BoardItem = ({ userId, title, no, board, board_no, getData }) => {
  const navigate = useNavigate();
  const userInfo = useContext(UserDataContext);

  // console.log(board);
  //삭제기능
  const removePosts = async () => {
    if (userId == userInfo[1]) {
      try {
        const response = await axios.delete(
          `http://localhost:8080/api-board/delete?board_no=${board_no}`,
        );
        console.log(response);
        alert(`글을 삭제합니다.`);
      } catch (error) {
        console.log(error);
      }
      getData();
    } else {
      alert('권한이 없습니다');
    }
  };
  //localhost:8080/api-board/delete?board_no=1
  http: return (
    <tr style={{ borderBottom: '1px solid black', cursor: 'pointer' }}>
      <td style={{ textAlign: 'center' }}>{no}</td>
      <td style={{ textAlign: 'center' }}>{userId}</td>
      <td style={{ textAlign: 'left' }}>
        <Link
          to={`/${board}/${no}`}
          style={{
            textDecoration: 'none',
            color: 'black',
            paddingLeft: '30px',
          }}
        >
          {title}
        </Link>
      </td>
      <td style={{ textAlign: 'center' }}>
        <button
          onClick={() => {
            navigate(`/${board}/${no}/edit`);
          }}
        >
          수정
        </button>
        <button onClick={removePosts}>삭제</button>
      </td>
    </tr>
  );
};
export default BoardItem;
