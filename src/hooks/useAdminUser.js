import { useQuery } from 'react-query';
import { adminUserRepository } from './../repositories/adminUserRepository';
import { useContext } from 'react';

import { AuthGuardContext } from './../providers/AuthGuard';
export const useAdminUsersApi = () => {
  const { accessToken } = useContext(AuthGuardContext);
  const useGetAdminUsers = () => {
    return useQuery({
      queryKey: 'admin_users',
      queryFn: () => adminUserRepository.getAdminUser(accessToken),
      staleTime: 30000000,
      cacheTime: 0,
    });
  };

  return { useGetAdminUsers };
};
