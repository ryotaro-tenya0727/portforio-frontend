import { useParams, useLocation } from 'react-router-dom';
import { Link, useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

const RecommendedMemberDiaryEdit = () => {
  const { recommended_member_uuid, recommended_member_id, diary_id } =
    useParams();
  const { search } = useLocation();
  const navigate = useNavigate();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  const { useDeleteRecommendedMemberDiary } = useRecommendedMemberDiariesApi();
  const deleteRecommendedMemberDiary = useDeleteRecommendedMemberDiary(
    recommended_member_id,
    diary_id
  );
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  const deleteDiary = () => {
    alert(
      `本当に${query.get('nickname')}との日記を削除しますか?
      `
    );
    deleteRecommendedMemberDiary.mutate();
    navigate(
      `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'nickname'
      )}&group=${query.get('group')}`
    );
  };
  return (
    <>
      <Link to='/mypage'>マイページへ</Link>
      <h1>
        {query.get('nickname')}: {query.get('group')}との日記編集
      </h1>
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <button onClick={deleteDiary}>この日記を削除</button>
          </>
        )
      ) : (
        <>
          <p> {userData.name}さんログイン中</p>
          <button onClick={deleteDiary}>この日記を削除</button>
        </>
      )}
      <br />
    </>
  );
};

export default RecommendedMemberDiaryEdit;
