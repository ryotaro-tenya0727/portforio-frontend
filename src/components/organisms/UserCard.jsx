import { useState } from 'react';

import Card from '@mui/material/Card';
import LoyaltyIcon from '@mui/icons-material/Loyalty';
import CollectionsBookmarkIcon from '@mui/icons-material/CollectionsBookmark';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

import { FollowButton, UnFollowButton } from './../atoms/atoms';
import card from './../../css/organisms/card.module.css';
const UserCard = ({
  id,
  name,
  meIntroduction,
  userImage,
  recommendedMembersCount,
  diariesCount,
  totalPolaroidCount,
  following,
  me,
}) => {
  const [followingState, setFollowingState] = useState(following);
  return (
    <div>
      <Card
        style={{
          maxWidth: '600px',
          width: '90%',
          marginBottom: '25px',
        }}
        className={card.card_whole}
        sx={{
          boxShadow:
            'rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px;',
        }}
      >
        <p
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className={card.card_text}
        >
          <p>
            <p style={{ display: 'flex' }}>
              <img
                src={`${userImage}`}
                alt='picture'
                className={card.card_general_photo}
                style={{
                  border: '2px solid #ff99c5',
                  borderRadius: '50%',
                  marginRight: '5px',
                }}
              />
              <p style={{ marginTop: '9px' }}>
                <span className={card.card_text_property}>
                  &nbsp;&nbsp;名前:
                </span>
                &nbsp;
                <span>{name}</span>
                <br />
              </p>
            </p>
          </p>
          {me ? (
            <></>
          ) : (
            <p>
              {followingState === 'Not Loggin' ? (
                <></>
              ) : (
                <>
                  {followingState ? (
                    <UnFollowButton id={id} changeFollow={setFollowingState} />
                  ) : (
                    <FollowButton id={id} changeFollow={setFollowingState} />
                  )}
                </>
              )}
            </p>
          )}
        </p>
        <p className={card.card_text}>
          <p
            style={{ marginTop: '5px' }}
            className={card.login_card_text_property}
          >
            自己紹介:
          </p>
          {meIntroduction}
        </p>
        <p
          style={{ display: 'flex', justifyContent: 'space-between' }}
          className={card.card_text}
        >
          <p>
            <span className={card.card_text_property}>
              <PhotoCameraBackIcon
                sx={{
                  fontSize: '22.5px',
                  mb: '-5.5px',
                  mr: '0px',
                  color: '#FF8C00',
                  '@media screen and (max-width:700px)': {
                    fontSize: '17px',
                  },
                }}
              />
              &nbsp;&nbsp;総チェキ数:
            </span>
            &nbsp;
            {totalPolaroidCount}
          </p>

          <p>
            <span className={card.card_text_property}>
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
              &nbsp;&nbsp;推しメン数:
            </span>
            &nbsp;
            {recommendedMembersCount}
          </p>
          <p>
            <span className={card.card_text_property}>
              <CollectionsBookmarkIcon
                sx={{
                  fontSize: '22.5px',
                  mb: '-5.5px',
                  mr: '0px',
                  color: '#00AA00',
                  '@media screen and (max-width:700px)': {
                    fontSize: '17px',
                  },
                }}
              />
              &nbsp;&nbsp;日記登録数:
            </span>
            &nbsp;
            {diariesCount}
          </p>
        </p>
      </Card>
    </div>
  );
};

export default UserCard;
