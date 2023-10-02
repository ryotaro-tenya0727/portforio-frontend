import { Link } from 'react-router-dom';
import Card from '@mui/material/Card';

import card from './../../css/organisms/card.module.css';
import notificationcard from './../../css/organisms/notificationcard.module.css';

const NotificationCard = ({
  notifierName,
  notifierImage,
  diaryId,
  diaryEventName,
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberName,
  recommendedMemberGroup,
  action,
  checked,
  created_at,
}) => {
  switch (action) {
    case 'follow':
      return (
        <>
          <Card
            style={{
              maxWidth: '750px',
              width: '95%',
              margin: '0 auto',
              padding: '10px 0px 0px 0px',
              marginBottom: '30px',
              border: '1.5px dashed #ff8a8a',
            }}
            sx={{
              boxShadow:
                'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
              bgcolor: '#FFFFFF',
            }}
          >
            <p className={notificationcard.card}>
              {checked ? (
                ''
              ) : (
                <p style={{ color: '#ff88db', margin: '-10px 0px 5px 0px' }}>
                  新しい通知
                </p>
              )}
              <img
                src={`${notifierImage}`}
                className={card.card_general_photo}
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '50%',
                  marginRight: '20px',
                  marginTop: '-6px',
                }}
              />
              {notifierName}さんにフォローされました
            </p>
            <p className={notificationcard.created}>{created_at}</p>
          </Card>
        </>
      );
    case 'like':
      return (
        <>
          <Card
            style={{
              maxWidth: '750px',
              width: '95%',
              margin: '0 auto',
              padding: '10px 0px 0px 0px',
              marginBottom: '30px',
              border: '1.5px dashed #ff8a8a',
            }}
            sx={{
              boxShadow:
                'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
              bgcolor: '#FFFFFF',
            }}
          >
            <p className={notificationcard.card}>
              {checked ? (
                ''
              ) : (
                <p
                  style={{
                    color: '#ff88db',
                    margin: '-10px 0px 5px 0px',
                  }}
                >
                  新しい通知
                </p>
              )}
              <img
                src={`${notifierImage}`}
                className={card.card_general_photo}
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '50%',
                  marginRight: '20px',
                  marginTop: '-6px',
                }}
              />
              {notifierName}さんが
              <Link
                to={`/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}/show/${diaryId}?recommended_member_nickname=${recommendedMemberName}&group=${recommendedMemberGroup}`}
                className={notificationcard.like_text}
              >
                {recommendedMemberName}との日記(
                {diaryEventName})
              </Link>
              をいいねしました。
            </p>
            <p className={notificationcard.created}>{created_at}</p>
          </Card>
        </>
      );
    default:
      console.log('actionの設定ミス');
  }
};

export default NotificationCard;
