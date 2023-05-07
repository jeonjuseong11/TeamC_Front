import React from 'react';
import Pagination from 'react-js-pagination';
import './Paging.css';
const Paging = ({ page, count, setPage }) => {
  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count / 2}
        pageRangeDisplayed={5}
        prevPageText={'<'}
        nextPageText={'>'}
        onChange={setPage}
      />
    </div>
  );
};

export default React.memo(Paging);
