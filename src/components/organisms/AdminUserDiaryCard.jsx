import Grid from '@mui/material/Grid';

import { Button } from './../atoms/atoms';
import Card from '@mui/material/Card';
import { useAdminDiariesApi } from './../../hooks/useAdminDiary';
import Zoom from 'react-medium-image-zoom';

import button from './../../css/atoms/button.module.css';
import card from './../../css/organisms/card.module.css';
import 'react-medium-image-zoom/dist/styles.css';

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
  return (
    <Grid item xs={12} sm={6}>
      <Card
        className={card.card_whole}
        sx={{
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
          border: '1px solid #ff66d1',
        }}
      >
        <div className={card.card_diary_button_list}>
          <p
            style={{
              margin: '0px 0px 7px 10px',
              fontSize: '17px',
            }}
            className={card.card_text_property}
          >
            {diaryMemberNickname}との思い出(グループ: {diaryMemberGroup})
          </p>
        </div>

        <p className={card.card_text} style={{ marginTop: '10px' }}>
          <span className={card.card_text_property}>
            &nbsp;&nbsp;イベント名:
          </span>
          &nbsp;
          {eventName ? eventName : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>&nbsp;&nbsp;日付:</span>
          &nbsp;
          {eventDate ? eventDate : '未入力'}
        </p>
        <p className={card.card_text}>
          <span className={card.card_text_property}>&nbsp;&nbsp;会場:</span>
          &nbsp;
          {eventVenue ? eventVenue : '未入力'}
        </p>

        <p className={card.card_text}>
          <span className={card.card_text_property}>
            &nbsp;&nbsp;印象に残った出来事:
          </span>
          &emsp;{impressiveMemory ? impressiveMemory : '未入力'}
        </p>

        <p className={card.card_text}>
          <span className={card.card_text_property}>
            &nbsp;&nbsp;印象に残った出来事の詳細:
          </span>
          &emsp;{impressiveMemoryDetail ? impressiveMemoryDetail : '未入力'}
        </p>
        <div className={card.card_photo_list}>
          {diaryImages.map((diaryImageUrl, index) => {
            return (
              <Zoom zoomMargin={40}>
                <img
                  key={index}
                  src={`${diaryImageUrl}`}
                  alt='picture'
                  width='130'
                  className={card.card_photo}
                  style={{
                    border: '2px solid #ff99c5',
                    borderRadius: '5px',
                  }}
                />
              </Zoom>
            );
          })}
        </div>
      </Card>
    </Grid>
  );
};

export default AdminUserDiaryCard;
