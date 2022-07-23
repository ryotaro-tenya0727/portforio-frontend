import { Button } from './../atoms/atoms';
import { useAdminDiariesApi } from './../../hooks/useAdminDiary';
import button from './../../css/atoms/button.module.css';
import card from './../../css/organisms/card.module.css';

const AdminUserDiaryCard = ({
  id,
  diaryImages,
  diaryMemberGroup,
  diaryMemberNickname,
  eventDate,
  eventName,
  eventVenue,
  impressiveMemory,
  impressiveMemoryDetail,
  status,
}) => {
  const { useDeleteAdminDiary } = useAdminDiariesApi();
  const deleteAdminUserDiary = useDeleteAdminDiary(id);
  return <div>a</div>;
};

export default AdminUserDiaryCard;
