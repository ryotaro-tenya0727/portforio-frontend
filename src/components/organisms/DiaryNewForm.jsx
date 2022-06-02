import { useForm } from 'react-hook-form';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useContext } from 'react';

import { Link, useNavigate } from 'react-router-dom';
import { recommendedMemberDiaryRepository } from './../../repositories/recommendedMemberDiaryRepository';

const DiaryNewForm = ({ recommended_member_id }) => {
  const { accessToken } = useContext(AuthGuardContext);
  const navigate = useNavigate();

  const { register, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    recommendedMemberDiaryRepository.createRecommendedMemberDiary(
      data,
      recommended_member_id,
      accessToken
    );
  };
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        {formState.errors.diary && (
          <>
            {formState.errors.diary.event_polaroid_count && '枚数超過'}
            <br />
            {formState.errors.diary.impressive_memory && '文字数超過'}
            <br />
            {formState.errors.diary.impressive_memory_detail && '文字数超過'}
          </>
        )}
        <br />
        <label htmlFor='event_name'>イベント名</label>
        <p>
          {' '}
          <input
            id='event_name'
            defaultValue=''
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
          <input id='event_venue' {...register('diary.event_venue')} />
        </p>
        <label htmlFor='event_polaroid_count'>この日のチェキ枚数</label>
        <p>
          <input
            id='event_polaroid_count'
            {...register('diary.event_polaroid_count', { max: 99 })}
            type='number'
          />
        </p>
        <label htmlFor='impressive_memory'>印象に残った出来事</label>
        <p>
          <input
            id='impressive_memory'
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
            {...register('diary.impressive_memory_detail', { maxLength: 30 })}
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
        {/* {console.log(formState.errors)} */}

        <input type='submit' />
      </form>
    </>
  );
};

export default DiaryNewForm;
