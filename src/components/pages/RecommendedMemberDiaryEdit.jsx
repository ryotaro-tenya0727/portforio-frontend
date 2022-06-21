import { useParams, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

import { HomeBreadText, Button } from './../atoms/atoms';
import { BreadCrumbs } from './../organisms/Organisms';
import { RecommenedMemberDiaryEditForm } from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

import button from './../../css/atoms/button.module.css';

const RecommendedMemberDiaryEdit = () => {
  const navigate = useNavigate();
  const { recommended_member_uuid, recommended_member_id, diary_id } =
    useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useDeleteRecommendedMemberDiary } = useRecommendedMemberDiariesApi();
  const deleteRecommendedMemberDiary = useDeleteRecommendedMemberDiary(
    recommended_member_id,
    diary_id
  );
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();

  const deleteDiary = () => {
    if (
      window.confirm(`本当に${query.get('nickname')}との日記を削除しますか?`)
    ) {
      deleteRecommendedMemberDiary.mutate();
      navigate(
        `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
          'nickname'
        )}&group=${query.get('group')}`
      );
    }
  };

  const breadcrumbs = [
    {
      title: (
        <>
          <HomeBreadText />
        </>
      ),
      to: '/',
    },
    { title: 'マイページ', to: '/mypage' },
    {
      title: `${query.get('nickname')}の日記一覧`,
      to: `/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}?nickname=${query.get(
        'nickname'
      )}&group=${query.get('group')}`,
    },
    { title: `${query.get('nickname')}の日記編集ページ` },
  ];
  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}

      {userData === undefined ? (
        isIdle || isLoading ? (
          <p>load</p>
        ) : (
          <>
            <p>{data.data.attributes.name}さんログイン中</p>
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <RecommenedMemberDiaryEditForm
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={query.get('group')}
              diaryId={diary_id}
            />
            <br />
            <button onClick={deleteDiary}>この日記を削除</button>
          </>
        )
      ) : (
        <>
          <p> {userData.data.attributes.name}さんログイン中</p>
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <RecommenedMemberDiaryEditForm
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={query.get('group')}
            diaryId={diary_id}
          />
          <br />
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button className={button.delete} onClick={deleteDiary}>
              <BrokenImageIcon
                sx={{
                  fontSize: '20px',
                  mb: '-4.5px',
                  mr: '3px',
                }}
              />
              この日記を削除
            </Button>
          </div>
        </>
      )}
      <br />
    </>
  );
};

export default RecommendedMemberDiaryEdit;
