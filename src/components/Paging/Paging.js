import React from "react";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import "./Paging.css";

const Paging = ({ page, count, setPage }) => {
  const navigate = useNavigate(); //글쓰기 버튼에 쓸 navigate

  return (
    <div>
      <Pagination
        activePage={page}
        itemsCountPerPage={5}
        totalItemsCount={count / 2}
        pageRangeDisplayed={5}
        prevPageText={"<"}
        nextPageText={">"}
        onChange={setPage}
      />
      <button
        onClick={() => {
          navigate("/post");
        }}
      >
        글쓰기
      </button>
    </div>
  );
};

export default Paging;
