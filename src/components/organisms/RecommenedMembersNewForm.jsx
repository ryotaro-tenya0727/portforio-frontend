import { useForm } from 'react-hook-form';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext } from 'react';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

const RecommenedMembersNewForm = () => {
  const { useCreateRecommendedMember } = useRecommendedMembersApi();
  const createRecommendedMember = useCreateRecommendedMember();

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
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        {formState.errors.recommended_member && (
          <span>This field is required</span>
        )}
        <br />

        <br />
        <label htmlFor='group'>推しメンの所属グループ</label>
        <br />
        <input id='group' {...register('recommended_member.group')} />
        <p>空白でも登録可能です</p>

        <input type='submit' />
      </form>
    </>
  );
};

export default RecommenedMembersNewForm;
