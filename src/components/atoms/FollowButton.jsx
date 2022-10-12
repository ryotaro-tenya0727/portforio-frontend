import axios from 'axios';
import { useContext } from 'react';
import { useForm } from 'react-hook-form';

import { REST_API_URL } from '../../urls/index';
import { AuthGuardContext } from './../../providers/AuthGuard';

import button from './../../css/atoms/button.module.css';

const FollowButton = ({ id, changeFollow }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const { register, handleSubmit } = useForm({});

  const onSubmit = (data) => {
    console.log(data);
    axios
      .post(`${REST_API_URL}/user/user_relationships`, data, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        changeFollow(true);
      })
      .catch((error) => {
        console.log('follow error');
      });
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('id', { value: id })} type='hidden' />
      <input type='submit' value={`フォローする`} className={button.follow} />
    </form>
  );
};

export default FollowButton;
