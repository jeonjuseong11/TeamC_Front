import BoardDetail from "../../components/Board/BoardDetail";
import Sidebar from "../../components/Sidebar/Sidebar";
import Top from "../../components/Top/\bTop";

const DetailPage = ({ menus, User }) => {
  return (
    <div>
      <Top User={User} />
      <Sidebar menus={menus} />
      <BoardDetail />
    </div>
  );
};
export default DetailPage;
