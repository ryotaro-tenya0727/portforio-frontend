import { useParams, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';

import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { RecommendedMemberDiariesList } from './../organisms/Organisms';

const RecommenedMembersDiaries = () => {
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  return (
    <>
      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <Link to='/mypage'>マイページへ</Link>
            <h1>{`${query.get('nickname')}との日記(グループ：　${query.get(
              'group'
            )})`}</h1>
            <Link
              to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
                'nickname'
              )}`}
            >
              日記を追加する
            </Link>
            <div>推しメンの日記一覧 </div>
            <RecommendedMemberDiariesList
              recommended_member_id={recommended_member_id}
              recommended_member_nickname={query.get('nickname')}
            />
          </>
        )
      ) : (
        <>
          <p> {userData.name}さんログイン中</p>
          <Link to='/mypage'>マイページへ</Link>
          <h1>{`${query.get('nickname')}との日記(グループ：${query.get(
            'group'
          )})`}</h1>
          <Link
            to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
              'nickname'
            )}`}
          >
            日記を追加する
          </Link>
          <div>推しメンの日記一覧 </div>
          <RecommendedMemberDiariesList
            recommended_member_id={recommended_member_id}
            recommended_member_nickname={query.get('nickname')}
          />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMembersDiaries;
