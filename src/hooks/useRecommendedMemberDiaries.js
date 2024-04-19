import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { recommendedMemberDiaryRepository } from './../repositories/recommendedMemberDiaryRepository';

export const useRecommendedMemberDiariesApi = () => {
  const { getAccessTokenSilently } = useAuth0();
  const navigate = useNavigate();
  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  // 推しメンの日記一覧取得
  const useGetRecommendedMemberDiaries = (recommendedMemberId) => {
    return useQuery({
      queryKey: [
        'recommended_member_diaries',
        { recommendedMemberId: recommendedMemberId },
      ],
      queryFn: async () => {
        const accessToken = await getAccessTokenSilently();
        const response =
          await recommendedMemberDiaryRepository.getRecommendedMemberDiary(
            recommendedMemberId,
            accessToken || ''
          );
        return response.data;
      },
      enabled: !!recommendedMemberId,
      staleTime: 0,
      cacheTime: 0,
    });
  };

  //推しメンの日記作成
  const useCreateRecommendedMemberDiaries = (
    recommendedMemberId,
    recommendedMemberUuid,
    recommendedMemberNickname,
    recommendedMemberGroup
  ) => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberDiaryRepository.createRecommendedMemberDiary(
          params,
          recommendedMemberId,
          accessToken || ''
        );
      },

      {
        onError: (err, _, context) => {
          console.warn(err);
        },
        onSuccess: () => {
          // navigate(
          //   `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
          // );
          // returnTop();
        },
      }
    );
  };

  // 推しメンの日記編集
  const usePutRecommendedMemberDiary = (
    recommendedMemberId,
    diaryId,
    recommendedMemberUuid,
    recommendedMemberNickname,
    recommendedMemberGroup
  ) => {
    return useMutation(
      async (params) => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberDiaryRepository.putRecommendedMemberDiary(
          params,
          diaryId,
          accessToken || ''
        );
      },
      {
        onError: (err) => {
          console.warn(err);
        },
        onSuccess: async () => {
          navigate(
            `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
          );
          returnTop();
        },
      }
    );
  };

  // 推しメンの日記削除
  const useDeleteRecommendedMemberDiary = (
    recommendedMemberId,
    diaryId,
    recommendedMemberUuid,
    recommendedMemberNickname,
    recommendedMemberGroup
  ) => {
    return useMutation(
      async () => {
        const accessToken = await getAccessTokenSilently();
        return await recommendedMemberDiaryRepository.deleteRecommendedMemberDiary(
          diaryId,
          accessToken || ''
        );
      },
      {
        onError: (err) => {
          console.warn(err);
        },
        onSuccess: async () => {
          navigate(
            `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
          );
          returnTop();
        },
      }
    );
  };

  // 推しメンの日記の詳細を取得
  const useShowRecommendedMemberDiary = (diaryId) => {
    return useQuery({
      queryKey: ['recommended_member_diary_show', { diaryId: diaryId }],
      queryFn: async () => {
        const accessToken = await getAccessTokenSilently();
        const response =
          await recommendedMemberDiaryRepository.getRecommendedMemberDiaryShow(
            diaryId,
            accessToken || ''
          );
        return response;
      },
      onSuccess: async () => {
        returnTop();
      },
      onError: (err) => {
        console.warn(err);
      },
      enabled: !!diaryId,
      staleTime: 0,
      cacheTime: 0,
    });
  };

  return {
    useGetRecommendedMemberDiaries,
    useCreateRecommendedMemberDiaries,
    usePutRecommendedMemberDiary,
    useDeleteRecommendedMemberDiary,
    useShowRecommendedMemberDiary,
  };
};
// export const useRecommendedMemberDiariesApi = () => {
//   const navigate = useNavigate();
//   const { getAccessTokenSilently } = useAuth0();
//   const returnTop = () => {
//     window.scrollTo({
//       top: 0,
//       behavior: 'smooth',
//     });
//   };
//   // 推しメンの日記一覧取得
//   const useGetRecommendedMemberDiaries = (recommendedMemberId) => {
//     return useQuery({
//       queryKey: [
//         'recommended_member_diaries',
//         { recommendedMemberId: recommendedMemberId },
//       ],
//       queryFn: async () => {
//         const accessToken = await getAccessTokenSilently();
//         const response =
//           await recommendedMemberDiaryRepository.getRecommendedMemberDiary(
//             recommendedMemberId,
//             accessToken || ''
//           );
//         return response.data;
//       },
//       enabled: !!recommendedMemberId,
//       staleTime: 0,
//       cacheTime: 0,
//     });
//   };

//   //推しメンの日記作成
//   const useCreateRecommendedMemberDiaries = (recommendedMemberId) => {
//     const queryClient = useQueryClient();
//     const queryKey = [
//       'recommended_member_diaries',
//       { recommendedMemberId: recommendedMemberId },
//     ];

//     const updater = (previousData, data) => {
//       previousData.data.unshift({
//         attributes: data.diary,
//       });
//       return previousData;
//     };

//     const recommendedMemberUpdater = (previousData, data) => {
//       previousData.data = previousData.data.map((recommendedMember) => {
//         // recommendedMemberIdはstringなので数値に変換
//         if (recommendedMember.attributes.id === Number(recommendedMemberId)) {
//           return {
//             attributes: {
//               ...recommendedMember.attributes,
//               ...{
//                 total_member_polaroid_count:
//                   Number(data.event_polaroid_count) +
//                   recommendedMember.attributes.total_member_polaroid_count,
//               },
//               ...{
//                 diaries_count: recommendedMember.attributes.diaries_count + 1,
//               },
//             },
//           };
//         } else {
//           return recommendedMember;
//         }
//       });

//       return previousData;
//     };

//     return useMutation(
//       async (params) => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberDiaryRepository.createRecommendedMemberDiary(
//           params,
//           recommendedMemberId,
//           accessToken || ''
//         );
//       },
//       //mutateAsyncを開始したタイミングで実行。
//       // paramsはmutateに渡した引数
//       {
//         onMutate: async (params) => {
//           await queryClient.cancelQueries(queryKey);
//           const previousData = await queryClient.getQueryData(queryKey);
//           if (previousData) {
//             queryClient.setQueryData(queryKey, () => {
//               // previousDataにdataを加える。
//               return updater(previousData, params);
//             });
//           }
//           const previousRecommendedMemberData = await queryClient.getQueryData(
//             'recommended_members'
//           );

//           if (previousRecommendedMemberData) {
//             queryClient.setQueryData('recommended_members', () => {
//               return recommendedMemberUpdater(
//                 previousRecommendedMemberData,
//                 params.diary
//               );
//             });
//           }
//           return previousData;
//         },
//         onError: (err, _, context) => {
//           console.warn(err);
//         },
//         // すべての処理が終了した際にキャッシュを更新する
//         // APIから取得成功した場合は仮のデータから取得したデータに更新
//         // 失敗した場合は旧データに更新
//         // queryKeyのuse queryを再取得しにいく
//         onSuccess: async () => {
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   // 推しメンの日記編集
//   const usePutRecommendedMemberDiary = (recommendedMemberId, diaryId) => {
//     const queryClient = useQueryClient();
//     const queryKey = [
//       'recommended_member_diaries',
//       { recommendedMemberId: recommendedMemberId },
//     ];

//     const updater = (previousData, params) => {
//       previousData.data = previousData.data.map((diary) => {
//         if (diary.id === diaryId) {
//           return {
//             attributes: { ...diary.attributes, ...params.diary },
//           };
//         } else {
//           return diary;
//         }
//       });

//       return previousData;
//     };

//     const recommendedMemberUpdater = (
//       previousData,
//       data,
//       previousPolaroidCount
//     ) => {
//       previousData.data = previousData.data.map((recommendedMember) => {
//         // recommendedMemberIdはstringなので数値に変換
//         if (recommendedMember.attributes.id === Number(recommendedMemberId)) {
//           return {
//             attributes: {
//               ...recommendedMember.attributes,
//               ...{
//                 total_member_polaroid_count:
//                   Number(data.event_polaroid_count) +
//                   recommendedMember.attributes.total_member_polaroid_count -
//                   previousPolaroidCount,
//               },
//             },
//           };
//         } else {
//           return recommendedMember;
//         }
//       });

//       return previousData;
//     };

//     return useMutation(
//       async (params) => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberDiaryRepository.putRecommendedMemberDiary(
//           params,
//           diaryId,
//           accessToken || ''
//         );
//       },
//       {
//         onMutate: async (params) => {
//           await queryClient.cancelQueries(queryKey);
//           const previousDiaryData = await queryClient.getQueryData(queryKey);
//           let previousPolaroidCount;
//           previousDiaryData.data.forEach((diary) => {
//             if (diary.attributes.id === Number(diaryId)) {
//               previousPolaroidCount = diary.attributes.event_polaroid_count;
//             }
//           });

//           if (previousDiaryData) {
//             queryClient.setQueryData(queryKey, () => {
//               return updater(previousDiaryData, params);
//             });
//           }

//           const previousRecommendedMemberData = await queryClient.getQueryData(
//             'recommended_members'
//           );

//           if (previousRecommendedMemberData) {
//             queryClient.setQueryData('recommended_members', () => {
//               return recommendedMemberUpdater(
//                 previousRecommendedMemberData,
//                 params.diary,
//                 previousPolaroidCount
//               );
//             });
//           }

//           return previousDiaryData;
//         },
//         onError: (err) => {
//           console.warn(err);
//         },
//         onSuccess: async () => {
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   // 推しメンの日記削除
//   const useDeleteRecommendedMemberDiary = (recommendedMemberId, diaryId) => {
//     const queryClient = useQueryClient();
//     const queryKey = [
//       'recommended_member_diaries',
//       { recommendedMemberId: recommendedMemberId },
//     ];

//     const updater = (previousData) => {
//       previousData.data = previousData.data.filter(
//         (diary) => diary.id !== diaryId
//       );
//       return previousData;
//     };

//     const recommendedMemberUpdater = (previousData, previousDiaryCount) => {
//       previousData.data = previousData.data.map((recommendedMember) => {
//         // recommendedMemberIdはstringなので数値に変換

//         if (recommendedMember.attributes.id === Number(recommendedMemberId)) {
//           return {
//             attributes: {
//               ...recommendedMember.attributes,

//               ...{
//                 diaries_count: recommendedMember.attributes.diaries_count - 1,
//                 total_member_polaroid_count:
//                   recommendedMember.attributes.total_member_polaroid_count -
//                   previousDiaryCount,
//               },
//             },
//           };
//         } else {
//           return recommendedMember;
//         }
//       });

//       return previousData;
//     };

//     return useMutation(
//       async () => {
//         const accessToken = await getAccessTokenSilently();
//         return await recommendedMemberDiaryRepository.deleteRecommendedMemberDiary(
//           diaryId,
//           accessToken || ''
//         );
//       },
//       {
//         onMutate: async () => {
//           await queryClient.cancelQueries(queryKey);
//           const previousData = await queryClient.getQueryData(queryKey);
//           let previousDiaryCount;
//           previousData.data.forEach((diary) => {
//             if (diary.attributes.id === Number(diaryId)) {
//               previousDiaryCount = diary.attributes.event_polaroid_count;
//             }
//           });
//           if (previousData) {
//             queryClient.setQueryData(queryKey, () => {
//               return updater(previousData);
//             });
//           }

//           const previousRecommendedMemberData = await queryClient.getQueryData(
//             'recommended_members'
//           );

//           if (previousRecommendedMemberData) {
//             queryClient.setQueryData('recommended_members', () => {
//               return recommendedMemberUpdater(
//                 previousRecommendedMemberData,
//                 previousDiaryCount
//               );
//             });
//           }

//           return previousData;
//         },
//         onError: (err) => {
//           console.warn(err);
//         },
//         onSuccess: async () => {
//           navigate('/mypage');
//           returnTop();
//         },
//       }
//     );
//   };

//   // 推しメンの日記の詳細を取得
//   const useShowRecommendedMemberDiary = (diaryId) => {
//     return useQuery({
//       queryKey: ['recommended_member_diary_show', { diaryId: diaryId }],
//       queryFn: async () => {
//         const accessToken = await getAccessTokenSilently();
//         const response =
//           recommendedMemberDiaryRepository.getRecommendedMemberDiaryShow(
//             diaryId,
//             accessToken || ''
//           );
//         return response.data;
//       },
//       enabled: !!diaryId,
//       staleTime: 30000000,
//       cacheTime: 0,
//     });
//   };

//   return {
//     useGetRecommendedMemberDiaries,
//     useCreateRecommendedMemberDiaries,
//     usePutRecommendedMemberDiary,
//     useDeleteRecommendedMemberDiary,
//     useShowRecommendedMemberDiary,
//   };
// };
