import { useContext } from 'react';
import { UserDataContext } from '../../App';
import BoardDetail from '../../components/Board/BoardDetail';
import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import style from './DetailPage.module.css';
const DetailPage = ({ menus }) => {
  const userInfo = useContext(UserDataContext);
  return (
    <div className={style.DetailPage}>
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} />
      <BoardDetail />
    </div>
  );
};
export default DetailPage;
