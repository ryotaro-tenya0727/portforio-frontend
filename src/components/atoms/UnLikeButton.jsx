import axios from 'axios';
import { useContext } from 'react';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';

import { REST_API_URL } from '../../urls/index';
import { AuthGuardContext } from './../../providers/AuthGuard';

import button from './../../css/atoms/button.module.css';

const UnLikeButton = ({ id, changeLike }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const unLike = () => {
    axios
      .delete(`${REST_API_URL}/user/likes/${id}`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        changeLike(false);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <button type='button' onClick={unLike} className={button.unlike}>
      いいね済
    </button>
  );
};

export default UnLikeButton;
