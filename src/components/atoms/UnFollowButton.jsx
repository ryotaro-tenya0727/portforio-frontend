import axios from 'axios';
import { useContext } from 'react';

import { REST_API_URL } from '../../urls/index';
import { AuthGuardContext } from './../../providers/AuthGuard';

import button from './../../css/atoms/button.module.css';

const UnFollowButton = ({ id, changeFollow }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const unFollow = () => {
    axios
      .delete(`${REST_API_URL}/user/user_relationships/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        changeFollow(false);
      })
      .catch((error) => {
        console.log('registration error');
      });
  };
  return (
    <button type='button' onClick={unFollow} className={button.unfollow}>
      フォロー解除
    </button>
  );
};

export default UnFollowButton;
