import { useMutation, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { recommendedMemberRepository } from './../repositories/recommendedMemberRepository';
import { useAuth0 } from '@auth0/auth0-react';

export const useRecommendedMembersApi = () => {
  const navigate = useNavigate();
  const { getAccessTokenSilently } = useAuth0();
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };
  const useGetRecommendedMembers = () => {
    return useQuery({
      queryKey: 'recommended_members',
      queryFn: async () => {
        const accessToken = await getAccessTokenSilently();
        const response = await recommendedMemberRepository.getRecommendedMember(
          accessToken || ''
        );
        return response.data;
      },
      staleTime: 0,
      cacheTime: 0,
    });
  };

  const useCreateRecommendedMembers = () => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberRepository.createRecommendedMember(
          params,
          accessToken || ''
        );
      },
      {
        onSuccess: async () => {
          navigate('/mypage');
          returnTop();
        },
        onError: (err) => {
          console.warn(err);
        },
      }
    );
  };

  const usePutRecommendedMember = (recommendedMemberId) => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberRepository.putRecommendedMember(
          params,
          recommendedMemberId,
          accessToken || ''
        );
      },
      {
        onSuccess: async () => {
          navigate('/mypage');
          returnTop();
        },
        onError: (err) => {
          console.warn(err);
        },
      }
    );
  };

  const useDeleteRecommendedMember = (recommendedMemberId) => {
    return useMutation(
      async () => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberRepository.deleteRecommendedMember(
          recommendedMemberId,
          accessToken || ''
        );
      },
      {
        onSuccess: () => {
          navigate('/mypage');
          returnTop();
        },
        onError: (err) => {
          console.warn(err);
        },
      }
    );
  };

  const useShowRecommendedMember = (recommendedMemberId) => {
    return useQuery({
      queryKey: [
        'recommended_member_show',
        { recommendedMemberId: recommendedMemberId },
      ],
      queryFn: async () => {
        const accessToken = await getAccessTokenSilently();
        recommendedMemberRepository.showRecommendedMember(
          recommendedMemberId,
          accessToken || ''
        );
      },
      enabled: !!recommendedMemberId,
      staleTime: 0,
      cacheTime: 0,
    });
  };

  return {
    useGetRecommendedMembers,
    useCreateRecommendedMembers,
    usePutRecommendedMember,
    useDeleteRecommendedMember,
    useShowRecommendedMember,
  };
};

// export const useRecommendedMembersApi = () => {
//   const navigate = useNavigate();
//   const { getAccessTokenSilently } = useAuth0();
//   const returnTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };

//   const useGetRecommendedMembers = () => {
//     return useQuery({
//       queryKey: 'recommended_members',
//       queryFn: async () => {
//         const accessToken = await getAccessTokenSilently();
//         const response = await recommendedMemberRepository.getRecommendedMember(
//           accessToken || ''
//         );
//         return response.data;
//       },
//       staleTime: 0,
//       cacheTime: 0,
//     });
//   };

//   const useCreateRecommendedMembers = () => {
//     const queryClient = useQueryClient();
//     const queryKey = 'recommended_members';

//     const updater = (previousData, data) => {
//       previousData.data.push({
//         attributes: data.recommended_member,
//       });
//       return previousData;
//     };

//     return useMutation(
//       async (params) => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberRepository.createRecommendedMember(
//           params,
//           accessToken || ''
//         );
//       },
//       {
//           onMutate: async (data) => {
//             await queryClient.cancelQueries(queryKey);
//             const previousData = await queryClient.getQueryData(queryKey);
//             if (previousData) {
//               queryClient.setQueryData(queryKey, () => {
//                 return updater(previousData, data);
//               });
//             }
//             return previousData;
//           },
//           onError: (err, _, context) => {
//             queryClient.setQueryData(queryKey, context);
//             console.warn(err);
//           },
//           onSettled: () => {
//             queryClient.invalidateQueries(queryKey);
//           },
//         onSuccess: async () => {
//           await queryClient.invalidateQueries(queryKey);
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   const usePutRecommendedMember = (recommendedMemberId) => {
//     const queryClient = useQueryClient();
//     const queryKey = 'recommended_members';

//     const updater = (previousData, params) => {
//       previousData.data = previousData.data.map((member) => {
//         if (member.id === recommendedMemberId) {
//           return {
//             attributes: { ...member.attributes, ...params.recommended_member },
//           };
//         } else {
//           return member;
//         }
//       });
//       return previousData;
//     };

//     return useMutation(
//       async (params) => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberRepository.putRecommendedMember(
//           params,
//           recommendedMemberId,
//           accessToken || ''
//         );
//       },

//       {
//         onMutate: async (params) => {
//           await queryClient.cancelQueries(queryKey);
//           const previousData = await queryClient.getQueryData(queryKey);
//           if (previousData) {
//             queryClient.setQueryData(queryKey, () => {
//               return updater(previousData, params);
//             });
//           }
//           return previousData;
//         },
//         onError: (err, _, context) => {
//           queryClient.setQueryData(queryKey, context);
//           console.warn(err);
//         },
//         onSettled: () => {
//           queryClient.invalidateQueries(queryKey);
//         },

//         onSuccess: async () => {
//           await queryClient.invalidateQueries(queryKey);
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   const useDeleteRecommendedMember = (recommendedMemberId) => {
//     const queryClient = useQueryClient();
//     const queryKey = 'recommended_members';

//     const updater = (previousData) => {
//       previousData.data = previousData.data.filter(
//         (member) => member.id !== recommendedMemberId
//       );
//       return previousData;
//     };

//     return useMutation(
//       async () => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberRepository.deleteRecommendedMember(
//           recommendedMemberId,
//           accessToken || ''
//         );
//       },
//       {
//         onMutate: async () => {
//           await queryClient.cancelQueries(queryKey);
//           const previousData = await queryClient.getQueryData(queryKey);
//           if (previousData) {
//             queryClient.setQueryData(queryKey, () => {
//               return updater(previousData);
//             });
//           }
//           return previousData;
//         },
//         onError: (err, _, context) => {
//           queryClient.setQueryData(queryKey, context);
//           console.warn(err);
//         },
//         onSettled: () => {
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   const useShowRecommendedMember = (recommendedMemberId) => {
//     return useQuery({
//       queryKey: [
//         'recommended_member_show',
//         { recommendedMemberId: recommendedMemberId },
//       ],
//       queryFn: async () => {
//         const accessToken = await getAccessTokenSilently();
//         recommendedMemberRepository.showRecommendedMember(
//           recommendedMemberId,
//           accessToken || ''
//         );
//       },
//       enabled: !!recommendedMemberId,
//       staleTime: 30000000,
//       cacheTime: 0,
//     });
//   };

//   return {
//     useGetRecommendedMembers,
//     useCreateRecommendedMembers,
//     usePutRecommendedMember,
//     useDeleteRecommendedMember,
//     useShowRecommendedMember,
//   };
// };
