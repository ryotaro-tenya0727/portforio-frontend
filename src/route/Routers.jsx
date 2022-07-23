import { Routes, Route } from 'react-router-dom';

import {
  AdminUsers,
  Home,
  MyPage,
  RecommenedMembersNew,
  RecommenedMemberDiariesNew,
  RecommenedMemberDiaries,
  RecommenedMemberDiaryShow,
  RecommendedMemberDiaryEdit,
  RecommenedMemberEdit,
  PrivacyPolicy,
  TermsOfService,
  GeneralDiaryShow,
  Page404,
  AdminUserDiaries,
} from '../components/pages/Pages';

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/admin' element={<AdminUsers />} />
      <Route path='/admin/:user_id/diaries' element={<AdminUserDiaries />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route path='/privacy-policy' element={<PrivacyPolicy />} />
      <Route path='/term-of-service' element={<TermsOfService />} />
      <Route path='/diaries/show/:diary_id' element={<GeneralDiaryShow />} />
      <Route path='*' element={<Page404 />} />
      <Route
        path='/recommended-members/new'
        element={<RecommenedMembersNew />}
      />
      <Route path='/recommended-member/:recommended_member_uuid'>
        <Route path='edit/:recommended_member_id'>
          <Route index element={<RecommenedMemberEdit />} />
        </Route>
      </Route>
      <Route path='/recommended-member/:recommended_member_uuid/diaries'>
        <Route path=':recommended_member_id'>
          <Route index element={<RecommenedMemberDiaries />} />
          <Route path='new'>
            <Route index element={<RecommenedMemberDiariesNew />} />
          </Route>
          <Route path='edit'>
            <Route path=':diary_id'>
              <Route index element={<RecommendedMemberDiaryEdit />} />
            </Route>
          </Route>
          <Route path='show'>
            <Route path=':diary_id'>
              <Route index element={<RecommenedMemberDiaryShow />} />
            </Route>
          </Route>
        </Route>
      </Route>
    </Routes>
  );
};
