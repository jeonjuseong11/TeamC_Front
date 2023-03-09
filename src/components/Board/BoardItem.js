import { Link } from 'react-router-dom';

const BoardItem = ({ userId, title, created_date, no, board }) => {
  return (
    <tr style={{ borderBottom: '1px solid black' }}>
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
        {created_date /*인간이 알아보기 좋은 숫자로 변환*/}
      </td>
    </tr>
  );
};
export default BoardItem;
