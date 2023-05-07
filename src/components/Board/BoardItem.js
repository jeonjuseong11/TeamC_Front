import { Link } from 'react-router-dom';
import React from 'react';
const BoardItem = ({ userId, title, no, board, create_dt }) => {
  // console.log(board);
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
      <td>{create_dt}</td>
    </tr>
  );
};
export default React.memo(BoardItem);
