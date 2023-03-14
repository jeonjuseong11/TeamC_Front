import { Link, useNavigate, useParams } from 'react-router-dom';

const BoardItem = ({ userId, title, created_date, no, board }) => {
  const navigate = useNavigate();
  return (
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
      </td>
    </tr>
  );
};
export default BoardItem;
