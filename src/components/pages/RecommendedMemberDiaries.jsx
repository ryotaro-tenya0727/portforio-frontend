import { memo } from 'react';
import { useParams, useLocation, Link } from 'react-router-dom';
import { useQueryClient } from 'react-query';
import BorderColorIcon from '@mui/icons-material/BorderColor';

import { Button, HomeBreadText } from './../atoms/atoms';
import { BreadCrumbs, Headers } from './../organisms/Organisms';
import {
  RecommendedMemberDiariesList,
  Loading,
} from './../templates/Templates';
import { RedirectToLogin } from './Pages';
import { useUsersApi } from './../../hooks/useUsers';

import button from './../../css/atoms/button.module.css';

const RecommenedMembersDiaries = memo(() => {
  const { recommended_member_uuid, recommended_member_id } = useParams();
  const { search } = useLocation();
  const query = new URLSearchParams(search);
  const { useGetAccesstokenAndGetUser, isAuthenticated, isAuthLoading } =
    useUsersApi();
  const queryClient = useQueryClient();
  const userData = queryClient.getQueryData('users');
  const { data, isIdle, isLoading } = useGetAccesstokenAndGetUser();
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
      title: <>{`${query.get('nickname')}`}の日記一覧</>,
    },
  ];

  return (
    <>
      {isAuthLoading || isAuthenticated || <RedirectToLogin />}
      {userData === undefined ? (
        isIdle || isLoading ? (
          <Loading />
        ) : (
          <>
            <Headers name={data.name} />
            <BreadCrumbs breadcrumbs={breadcrumbs} />
            <Link
              to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
                'nickname'
              )}&group=${query.get('group')}`}
            >
              <Button className={button.recommended_and_diary_button}>
                <BorderColorIcon
                  sx={{
                    fontSize: '18.5px',
                    mr: 0.5,
                    mb: '-3.5px',
                    color: '#ff6fc8',
                    '@media screen and (max-width:600px)': {
                      fontSize: '14.5px',
                      mr: 0.5,
                    },
                  }}
                />
                日記を追加する
              </Button>
            </Link>
            <RecommendedMemberDiariesList
              recommendedMemberId={recommended_member_id}
              recommendedMemberUuid={recommended_member_uuid}
              recommendedMemberNickname={query.get('nickname')}
              recommendedMemberGroup={query.get('group')}
            />
          </>
        )
      ) : (
        <>
          <Headers name={userData.name} />
          <BreadCrumbs breadcrumbs={breadcrumbs} />
          <Link
            to={`/recommended-member/${recommended_member_uuid}/diaries/${recommended_member_id}/new?nickname=${query.get(
              'nickname'
            )}&group=${query.get('group')}`}
          >
            <Button className={button.recommended_and_diary_button}>
              <BorderColorIcon
                sx={{
                  fontSize: '18.5px',
                  mr: 0.5,
                  mb: '-3.5px',
                  color: '#ff6fc8',
                  '@media screen and (max-width:600px)': {
                    fontSize: '14.5px',
                    mr: 0.5,
                  },
                }}
              />
              日記を追加する
            </Button>
          </Link>
          <RecommendedMemberDiariesList
            recommendedMemberId={recommended_member_id}
            recommendedMemberUuid={recommended_member_uuid}
            recommendedMemberNickname={query.get('nickname')}
            recommendedMemberGroup={query.get('group')}
          />
        </>
      )}
      <br />
    </>
  );
});

export default RecommenedMembersDiaries;
