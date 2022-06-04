import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';

import { useUsersApi } from './../../hooks/useUsers';
import { RecommenedMemberDiaryShowDetail } from './../organisms/Organisms';

const RecommenedMemberDiaryShow = () => {
  const { diary_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      <ReactQueryDevtools initialIsOpen={false} />
      <Link to='/mypage'>マイページへ</Link>
      <h1>{`${query.get('recommended_member_nickname')}`}の日記詳細</h1>
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
          </>
        )
      ) : (
        <>
          <p> {userData.name}さんログイン中</p>
          <RecommenedMemberDiaryShowDetail diaryId={diary_id} />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberDiaryShow;
