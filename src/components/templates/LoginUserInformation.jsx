import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import card from './../../css/organisms/card.module.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import CircularProgress from '@mui/material/CircularProgress';

import { AuthGuardContext } from './../../providers/AuthGuard';
import { getUserUrl } from './../../urls/index';

const LoginUserInformation = () => {
  const { accessToken } = useContext(AuthGuardContext);
  const [loading, setLoading] = useState(true);
  const [userData, setUser] = useState('');
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;

  const getUser = async () => {
    await axios
      .get(getUserUrl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((res) => {
        setUser(res.data.data.attributes);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <>
      {loading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <br />
          <CircularProgress size={130} sx={{ mt: '100px', color: '#ff7bd7' }} />
        </div>
      ) : (
        <div>
          <br />
          <Card
            className={card.login_user_card}
            sx={{
              boxShadow:
                'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1.15px;',
              backgroundImage: `url(${imageDomain}/admin/login_profile_image-min.png)`,
            }}
          >
            <p style={{ fontSize: '18px' }}>
              <LocalFloristIcon
                sx={{
                  fontSize: '20px',
                  mb: '-3.5px',
                  mr: '5px',
                  color: '#ff6fc8',
                }}
              />
              あなたのプロフィール
            </p>

            <img
              src={userData.user_image}
              alt='picture'
              width='60'
              height='60'
              style={{ borderRadius: '50%', marginBottom: '10px' }}
            />
            <br />

            <p className={card.login_card_text}>
              <p className={card.login_card_text_property}>名前</p>{' '}
              {userData.name}
            </p>

            <p className={card.login_card_text}>
              <p className={card.login_card_text_property}>自己紹介 </p>
              {userData.me_introduction}
            </p>
            <div
              style={{
                display: 'flex',
                width: '92%',
                margin: '0 auto',
              }}
            >
              <p className={card.login_card_text}>
                <p className={card.login_card_text_property}>
                  {' '}
                  <LoyaltyIcon
                    sx={{
                      fontSize: '20px',
                      mb: '-3.5px',
                      color: '#ff6fc8',
                      '@media screen and (max-width:700px)': {
                        fontSize: '15.5px',
                        ml: -2,
                      },
                    }}
                  />
                  &nbsp;推しメン登録数
                </p>
                {userData.recommended_members_count}
              </p>
              <p className={card.login_card_text}>
                <p className={card.login_card_text_property}>
                  {' '}
                  <AddAPhotoIcon
                    sx={{
                      fontSize: '20px',
                      mb: '-3.5px',
                      color: '#ff6fc8',
                      '@media screen and (max-width:700px)': {
                        fontSize: '15.5px',
                        ml: -1,
                      },
                    }}
                  />
                  &nbsp;総チェキ数
                </p>
                {userData.total_polaroid_count}
              </p>
              <p className={card.login_card_text}>
                <p className={card.login_card_text_property}>
                  {' '}
                  <CollectionsBookmarkIcon
                    sx={{
                      fontSize: '20px',
                      mb: '-3.5px',
                      color: '#ff6fc8',
                      '@media screen and (max-width:700px)': {
                        fontSize: '15.5px',
                        ml: -1,
                      },
                    }}
                  />
                  &nbsp;登録日記数{' '}
                </p>
                {userData.diaries_count}
              </p>
            </div>
          </Card>
        </div>
      )}
    </>
  );
};

export default LoginUserInformation;
