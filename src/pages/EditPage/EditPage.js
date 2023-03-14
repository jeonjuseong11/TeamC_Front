import Sidebar from '../../components/Sidebar/Sidebar';
import Top from '../../components/Top/Top';
import PostForm from '../../components/Post/PostForm';
import { useContext, useEffect, useState } from 'react';
import { PostsStateContext, UserDataContext } from '../../App';
import { useNavigate, useParams } from 'react-router-dom';
const EditPage = ({ menus, setIsLogin }) => {
  const [originData, setOriginData] = useState();
  const userInfo = useContext(UserDataContext);
  const postList = useContext(PostsStateContext);
  const navigate = useNavigate();
  const { no } = useParams(); //글번호
  useEffect(() => {
    if (postList.length >= 1) {
      const targetDiary = postList.find(
        (it) => parseInt(it.no) == parseInt(no),
      );
      console.log(targetDiary);

      if (targetDiary) {
        setOriginData(targetDiary);
      } else {
        navigate('/', { replace: true }); //뒤로가기를 눌러도 돌아가지 않게하기
      }
    }
  }, [no.userInfo]);
  return (
    <>
      <Top userInfo={userInfo} />
      <Sidebar menus={menus} setIsLogin={setIsLogin} />
      {originData && <PostForm isEdit={true} originData={originData} />}
    </>
  );
};
export default EditPage;
