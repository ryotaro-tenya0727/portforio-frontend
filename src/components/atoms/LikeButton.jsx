import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { REST_API_URL } from '../../urls/index';
import { AuthGuardContext } from './../../providers/AuthGuard';

import button from './../../css/atoms/button.module.css';

const LikeButton = ({ id, changeLike }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const { register, handleSubmit } = useForm({});
  const onSubmit = (data) => {
    axios
      .post(`${REST_API_URL}/user/likes`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        changeLike(true);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('id', { value: id })} type='hidden' />

      <input type='submit' value={`いいね`} className={button.like} />
    </form>
  );
};

export default LikeButton;
