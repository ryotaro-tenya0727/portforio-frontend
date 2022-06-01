import { Routes, Route } from 'react-router-dom';

import {
  Home,
  MyPage,
  RecommenedMembersNew,
  RecommenedMemberDiariesNew,
  RecommenedMemberDiaries,
} from '../components/pages/Pages';

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mypage' element={<MyPage />} />
      <Route
        path='/recommended-members/new'
        element={<RecommenedMembersNew />}
      />

      <Route path='/recommended-member/:recommended_member_uuid/diaries'>
        <Route index element={<RecommenedMemberDiaries />} />
      </Route>
    </Routes>
  );
};
