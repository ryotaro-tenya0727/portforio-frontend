import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

const RecommenedMemberDiaryEditForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
  diaryId,
}) => {
  const navigate = useNavigate();
  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { useShowRecommendedMemberDiary, usePutRecommendedMemberDiary } =
    useRecommendedMemberDiariesApi();

  const putRecommendedMemberDiary = usePutRecommendedMemberDiary(
    recommendedMemberId,
    diaryId
  );

  let {
    data: diaryShow,
    isIdle,
    isLoading,
  } = useShowRecommendedMemberDiary(diaryId);

  diaryShow = diaryShow && diaryShow.data.attributes;

  const onSubmit = (data) => {
    try {
      putRecommendedMemberDiary.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    navigate(
      `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
    );
  };

  return (
    <>
      <h1>推しメン編集フォーム</h1>
      {isIdle || isLoading ? (
        <h2>編集フォームローディング</h2>
      ) : (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            {formState.errors.diary && (
              <>
                {formState.errors.diary.event_polaroid_count && '枚数超過'}
                <br />
                {formState.errors.diary.impressive_memory && '文字数超過'}
                <br />
                {formState.errors.diary.impressive_memory_detail &&
                  '文字数超過'}
              </>
            )}
            <br />
            <label htmlFor='event_name'>イベント名</label>
            <p>
              {' '}
              <input
                id='event_name'
                defaultValue={`${diaryShow.event_name}`}
                {...register('diary.event_name')}
              />
            </p>

            <label htmlFor='event_date'>日付</label>
            <p>
              <input
                id='event_date'
                {...register('diary.event_date')}
                type='date'
              />
            </p>
            <label htmlFor='event_venue'>イベント会場</label>
            <p>
              <input
                id='event_venue'
                defaultValue={`${diaryShow.event_venue}`}
                {...register('diary.event_venue')}
              />
            </p>
            <label htmlFor='event_polaroid_count'>この日のチェキ枚数</label>
            <p>
              <input
                id='event_polaroid_count'
                defaultValue={`${diaryShow.event_polaroid_count}`}
                {...register('diary.event_polaroid_count', { max: 99 })}
                type='number'
              />
            </p>
            <label htmlFor='impressive_memory'>印象に残った出来事</label>
            <p>
              <input
                id='impressive_memory'
                defaultValue={`${diaryShow.impressive_memory}`}
                {...register('diary.impressive_memory', { maxLength: 30 })}
                type='text'
              />
            </p>
            <label htmlFor='impressive_memory_detail'>
              印象に残った出来事の詳細
            </label>
            <p>
              <textarea
                id='impressive_memory_detail'
                defaultValue={`${diaryShow.impressive_memory_detail}`}
                {...register('diary.impressive_memory_detail', {
                  maxLength: 30,
                })}
                cols='40'
                rows='4'
              />
            </p>

            <label htmlFor='status'>公開設定</label>
            <p>
              <select id='status' {...register('diary.status')}>
                <option value='published'>公開する</option>
                <option value='non_published'>公開しない</option>
              </select>
            </p>

            <input type='submit' value='この内容で編集' />
          </form>
        </>
      )}
    </>
  );
};

export default RecommenedMemberDiaryEditForm;
