import { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import Card from '@mui/material/Card';
import card from './../../css/organisms/card.module.css';
import LocalFloristIcon from '@mui/icons-material/LocalFlorist';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import LoyaltyIcon from '@mui/icons-material/Loyalty';

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
        <>ユーザー更新中</>
      ) : (
        <div>
          <Card
            className={card.login_user_card}
            sx={{
              boxShadow: '0 12px 10px -6px rgba(176, 170, 168, 0.7)',
              backgroundImage: {
                xs: 'none',
                md: `url(${imageDomain}/admin/login_profile_image.png)`,
              },
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
            <br />
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
                    }}
                  />
                  &nbsp;推しメン登録数
                </p>
                {userData.recommended_members_count}
              </p>
              <p className={card.login_card_text}>
                <p className={card.login_card_text_property}>
                  {' '}
                  <LoyaltyIcon
                    sx={{
                      fontSize: '20px',
                      mb: '-3.5px',
                      color: '#ff6fc8',
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
                    sx={{ fontSize: '20px', mb: '-3.5px', color: '#ff6fc8' }}
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