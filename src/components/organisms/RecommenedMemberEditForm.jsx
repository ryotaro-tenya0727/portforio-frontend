import { useForm } from 'react-hook-form';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { useQueryClient } from 'react-query';
import { Link, useNavigate } from 'react-router-dom';

const RecommenedMemberEditForm = ({
  recommendedMemberUuid,
  recommendedMemberId,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { useShowRecommendedMember, usePutRecommendedMember } =
    useRecommendedMembersApi();

  const putRecommendedMember = usePutRecommendedMember(recommendedMemberId);

  let {
    data: recommendedMemberShow,
    isIdle,
    isLoading,
  } = useShowRecommendedMember(recommendedMemberId);

  const onSubmit = (data) => {
    try {
      putRecommendedMember.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    navigate('/mypage');
  };

  return (
    <>
      <h2>編集フォーム</h2>

      {isIdle || isLoading ? (
        <h2>編集フォームローディング</h2>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formState.errors.recommended_member && (
              <>
                {formState.errors.recommended_member.nickname &&
                  'ニックネーム必要'}
              </>
            )}
            <br />
            <label htmlFor='nickname'>推しメンのニックネーム</label>
            <br />
            <input
              id='nickname'
              defaultValue={`${recommendedMemberShow.data.attributes.nickname}`}
              {...register('recommended_member.nickname', {
                required: true,
              })}
            />
            <br />

            <br />

            <br />
            <label htmlFor='group'>推しメンの所属グループ</label>
            <br />
            <input
              id='group'
              defaultValue={`${recommendedMemberShow.data.attributes.group}`}
              {...register('recommended_member.group')}
            />
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
      )}
    </>
  );
};

export default RecommenedMemberEditForm;
