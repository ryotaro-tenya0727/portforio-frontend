import { useForm } from 'react-hook-form';

import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { useNavigate } from 'react-router-dom';

const RecommenedMembersNewForm = () => {
  const navigate = useNavigate();
  const { useCreateRecommendedMembers } = useRecommendedMembersApi();
  const createRecommendedMember = useCreateRecommendedMembers();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    try {
      createRecommendedMember.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    navigate('/mypage');
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formState.errors.recommended_member && (
          <>
            {formState.errors.recommended_member.nickname && 'ニックネーム必要'}
          </>
        )}
        <br />
        <label htmlFor='nickname'>推しメンのニックネーム</label>
        <br />
        <input
          id='nickname'
          defaultValue=''
          {...register('recommended_member.nickname', {
            required: true,
          })}
        />
        <br />

        <br />

        <br />
        <label htmlFor='group'>推しメンの所属グループ</label>
        <br />
        <input id='group' {...register('recommended_member.group')} />
        <p>空白でも登録可能です</p>

        <label htmlFor='first_met_date'>初めて会った日</label>
        <p>
          <input
            id='first_met_date'
            {...register('recommended_member.first_met_date')}
            type='date'
          />
        </p>

        <input type='submit' />
      </form>
    </>
  );
};

export default RecommenedMembersNewForm;
