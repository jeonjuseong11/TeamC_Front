import React, {
  useEffect,
  useState,
  useContext,
  useRef,
  useCallback,
} from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import style from './Board.module.css';
import BoardItem from './BoardItem';
import Paging from '../Paging/Paging.js';
import { GetDataContext, PostsStateContext } from '../../App';
import searchIcon from '../../assets/searchicon.png';
import resetIcon from '../../assets/reseticon.png';
const BoardList = ({ setPostList }) => {
  const postList = useContext(PostsStateContext);
  const getData = useContext(GetDataContext);
  let { board } = useParams();
  const navigate = useNavigate(); //글쓰기 버튼에 쓸 navigate
  // console.log(postList);데이터 확인용
  //pagination
  const [count, setCount] = useState(0); // 아이템 총 개수
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지. default 값으로 1
  const [postPerPage] = useState(10); // 한 페이지에 보여질 아이템 수
  const [indexOfLastPost, setIndexOfLastPost] = useState(0); // 현재 페이지의 마지막 아이템 인덱스
  const [indexOfFirstPost, setIndexOfFirstPost] = useState(0); // 현재 페이지의 첫번째 아이템 인덱스
  const [currentPosts, setCurrentPosts] = useState(0); // 현재 페이지에서 보여지는 아이템들
  useEffect(() => {
    setCount(postList.length);
    setIndexOfLastPost(currentPage * postPerPage);
    setIndexOfFirstPost(indexOfLastPost - postPerPage);
    setCurrentPosts(postList.slice(indexOfFirstPost, indexOfLastPost));
  }, [currentPage, indexOfLastPost, indexOfFirstPost, postList, postPerPage]);
  //검색창 state
  const [search, setSearch] = useState('');
  const titleInput = useRef();
  //검색창 action 코드
  const onChangeSearch = useCallback((e) => {
    e.preventDefault();
    setSearch(e.target.value);
  }, []);

  //검색 기능 코드
  const initList = (e) => {
    getData();
    setSearch('');
  };

  const onSearch = (e) => {
    e.preventDefault();
    if (search === null || search === '') {
      titleInput.current.focus();
      alert('검색어을 입력해주세요');
    } else {
      const filterData = postList.filter((it) =>
        it.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()),
      );
      setPostList(filterData);
      setCurrentPosts(filterData.slice(indexOfFirstPost, indexOfLastPost));
      setCurrentPage(1);
      return;
    }
  };

  return (
    <div className={style.BoardList}>
      <div className={style.search}>
        <div className={style.info}>
          <p>{postList.length}개의 글이 있습니다.</p>
        </div>
        <form>
          <img src={searchIcon} className={style.searchIcon} />
          <input
            type="text"
            className={style.titleInput}
            ref={titleInput}
            placeholder="제목"
            onChange={onChangeSearch}
            value={search}
          />
          <button className={style.searchBtn} onClick={onSearch} type="submit">
            Search
          </button>
          <button type="button" className={style.resetBtn} onClick={initList}>
            <img src={resetIcon} />
          </button>
        </form>
        <button
          type="button"
          className={style.writeBtn}
          onClick={() => {
            navigate(`/${board}/post`);
          }}
        >
          글쓰기
        </button>
      </div>

      <div className={style.tableWrapper}>
        <table className={style.table}>
          <colgroup>
            <col width="10%" />
            <col width="10%" />
            <col width="55%" />
            <col width="*" />
          </colgroup>
          <thead>
            <tr>
              <th>번호</th>
              <th>작성자</th>
              <th>제목</th>
              <th>작성 시간</th>
            </tr>
          </thead>
          <tbody>
            {currentPosts && postList.length > 0 ? (
              currentPosts.map((it) => (
                <BoardItem key={it.no} {...it} board={board} />
              ))
            ) : (
              <tr>
                <td colSpan="4" style={{ height: '60vh' }}>
                  검색 결과가 없습니다
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Paging
        page={currentPage}
        count={count}
        setPage={setCurrentPage}
        totalPosts={postList.length}
      />
    </div>
  );
};
export default React.memo(BoardList);
