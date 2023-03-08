import Sidebar from "../../components/Sidebar/Sidebar";
import Top from "../../components/Top/Top";
import PostForm from "../../components/Post/PostForm";
const PostPage = ({ menus, userInfo, setIsLogin }) => {
  return (
    <>
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} etIsLogin={setIsLogin} />
      <PostForm />
    </>
  );
};
export default PostPage;
