import { Routes, Route } from 'react-router-dom';

import { Home, MyPage } from './../components/pages/Pages';

export const Routers = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/mypage' element={<MyPage />} />
    </Routes>
  );
};
