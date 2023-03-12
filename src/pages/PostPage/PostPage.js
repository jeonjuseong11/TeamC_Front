import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import PostForm from '../../components/Post/PostForm';
import { useContext } from 'react';
import { UserDataContext } from '../../App';
const PostPage = ({ menus, setIsLogin, getData }) => {
  const userInfo = useContext(UserDataContext);
  return (
    <>
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} etIsLogin={setIsLogin} />
      <PostForm userInfo={userInfo} getData={getData} />
    </>
  );
};
export default PostPage;
