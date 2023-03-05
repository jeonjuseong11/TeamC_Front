import BoardDetail from "../../components/Board/BoardDetail";
import Sidebar from "../../components/Sidebar/Sidebar";
import Top from "../../components/Top/\bTop";
import style from "./DetailPage.module.css";
const DetailPage = ({ menus, User }) => {
  return (
    <div className={style.DetailPage}>
      <Top User={User} />
      <Sidebar menus={menus} />
      <BoardDetail />
    </div>
  );
};
export default DetailPage;
