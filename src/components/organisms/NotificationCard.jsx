import Card from '@mui/material/Card';

import card from './../../css/organisms/card.module.css';
import notificationcard from './../../css/organisms/notificationcard.module.css';

const NotificationCard = ({
  notifierName,
  notifierImage,
  diaryEventName,
  recommendedMemberName,
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
              maxWidth: '800px',
              width: '95%',
              margin: '0 auto',
              padding: '10px 0px 0px 0px',
            }}
            sx={{
              boxShadow:
                'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
              bgcolor: '#FFFFFF',
            }}
          >
            <p className={notificationcard.card}>
              <img
                src={`${notifierImage}`}
                alt='picture'
                className={card.card_general_photo}
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '50%',
                  marginRight: '20px',
                  marginTop: '-5px',
                }}
              />
              {notifierName}さんにフォローされました
            </p>
            <p className={notificationcard.created}>{created_at}</p>
          </Card>
        </>
      );
    case 'like':
    default:
      console.log('actionの設定ミス');
  }
};

export default NotificationCard;
