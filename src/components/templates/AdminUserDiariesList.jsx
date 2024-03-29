import CircularProgress from '@mui/material/CircularProgress';
import Grid from '@mui/material/Grid';

import { AdminUserDiaryCard } from './../organisms/Organisms';
import { RedirectToLogin } from './../pages/Pages';
import { useAdminDiariesApi } from './../../hooks/useAdminDiary';

const AdminUserDiariesList = ({ role, userId }) => {
  const { useGetAdminDiaries } = useAdminDiariesApi();
  const {
    data: adminUserDiaries,
    isIdle,
    isLoading,
  } = useGetAdminDiaries(userId);

  return (
    <>
      {' '}
      {role === 'general' && <RedirectToLogin />}{' '}
      {isIdle || isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <br />
          <CircularProgress size={130} sx={{ mt: '100px', color: '#ff7bd7' }} />
        </div>
      ) : (
        <>
          <Grid container spacing={3}>
            {adminUserDiaries.data.map((diary, index) => {
              return (
                <AdminUserDiaryCard
                  key={index}
                  diaryId={diary.attributes.id}
                  userId={userId}
                  diaryImages={diary.attributes.diary_images}
                  diaryMemberGroup={diary.attributes.diary_member_group}
                  diaryMemberNickname={diary.attributes.diary_member_nickname}
                  eventDate={diary.attributes.event_date}
                  eventName={diary.attributes.event_name}
                  eventVenue={diary.attributes.event_venue}
                  impressiveMemory={diary.attributes.impressiveMemory}
                  impressiveMemoryDetail={
                    diary.attributes.impressive_memory_detail
                  }
                  status={diary.attributes.status}
                />
              );
            })}
          </Grid>
        </>
      )}
    </>
  );
};

export default AdminUserDiariesList;
