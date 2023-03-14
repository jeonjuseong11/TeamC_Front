import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import PostForm from '../../components/Post/PostForm';
import { useContext } from 'react';
import { GetDataContext, UserDataContext } from '../../App';
const PostPage = ({ menus, setIsLogin }) => {
  const userInfo = useContext(UserDataContext);
  const getData = useContext(GetDataContext);
  return (
    <>
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} setIsLogin={setIsLogin} />
      <PostForm userInfo={userInfo} getData={getData} />
    </>
  );
};
export default PostPage;
