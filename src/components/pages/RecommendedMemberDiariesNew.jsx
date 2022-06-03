import { useParams, useLocation } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';

import { useUsersApi } from './../../hooks/useUsers';
import { DiaryNewForm } from './../organisms/Organisms';
const RecommenedMemberDiariesNew = () => {
  const { useGetAccesstokenAndGetUser } = useUsersApi();
  let { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const queryClient = useQueryClient();
  const user_data = queryClient.getQueryData('users');

  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
  return (
    <>
      <Link to='/mypage'>マイページへ</Link>
      {user_data === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.name}さんログイン中</p>
            <div>
              <h1>{`${query.get('nickname')}との日記追加中`}</h1>
            </div>
            <DiaryNewForm
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={`${query.get('nickname')}`}
              recommendedMemberGroup={`${query.get('group')}`}
            />
          </>
        )
      ) : (
        <>
          <p> {user_data.name}さんログイン中</p>
          <div>
            <h1>{`${query.get('nickname')}との日記追加中`}</h1>
          </div>
          <DiaryNewForm
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={`${query.get('nickname')}`}
            recommendedMemberGroup={`${query.get('group')}`}
          />
        </>
      )}
      <br />
    </>
  );
};

export default RecommenedMemberDiariesNew;
