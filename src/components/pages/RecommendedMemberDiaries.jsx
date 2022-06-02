import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';

const RecommenedMembersDiaries = () => {
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');

  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  // console.log(data);
  return (
    <>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}</p>
            <Link to='/mypage'>マイページへ</Link>
            <p>{`${query.get('nickname')}との日記(グループ：　${query.get(
              'group'
            )})`}</p>
            <Link
              to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new`}
            >
              日記を追加する
            </Link>
            <div>推しメンの日記一覧 </div>
          </>
        )
      ) : (
        <>
          <p> {user_data.name}</p>
          <Link to='/mypage'>マイページへ</Link>
          <p>{`${query.get('nickname')}との日記(グループ：${query.get(
            'group'
          )})`}</p>
          <Link
            to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new`}
          >
            日記を追加する
          </Link>
          <div>推しメンの日記一覧 </div>
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMembersDiaries;
