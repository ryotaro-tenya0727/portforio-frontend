import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { useState, useContext, useCallback } from 'react';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { s3PresignedUrlRepository } from './../../repositories/s3PresignedUrlRepository';

import Form from './../../css/templates/Form.module.css';

const DiaryNewForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const [s3ImageUrls, setImageUrls] = useState({});
  const [value, setValue] = useState([]);
  const { accessToken } = useContext(AuthGuardContext);
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff96df',
      },
      secondary: {
        main: '#000',
      },
    },
  });

  const { useCreateRecommendedMemberDiaries } =
    useRecommendedMemberDiariesApi();

  const createRecommendedMemberDiary =
    useCreateRecommendedMemberDiaries(recommendedMemberId);

  const upLoadImageToS3 = async (e) => {
    // 署名URLを取得
    const file = e.target.files[0];
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: file.name,
        },
      },
      accessToken
    );
    setImageUrls(imageUrls);
    setValue(file);
    // console.log(imageUrls);
  };

  const onSubmit = async (data) => {
    await axios.put(s3ImageUrls.presigned_url, value, {
      headers: {
        'Content-Type': 'image/*',
      },
    });
    createRecommendedMemberDiary.mutate({
      diary: { ...data.diary, diary_image_url: s3ImageUrls.diary_image_url },
    });
    navigate(
      `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)} className={Form.form}>
          <h1
            className={Form.form_title}
          >{`${recommendedMemberNickname}との日記追加中`}</h1>
          <br />

          <input
            type='file'
            accept='image/*'
            multiple
            onChange={(e) => upLoadImageToS3(e)}
          />

          <label htmlFor='event_name'>イベント名</label>
          <Controller
            defaultValue=''
            name='diary.event_name'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_name'
                label={
                  <span className={Form.text_label}>イベント名を入力</span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '100%' }}
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='event_date'>イベントの日付</label>
          <Controller
            defaultValue=''
            name='diary.event_date'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_date'
                label={
                  <span className={Form.text_label}>イベントの日付を入力</span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '50%' }}
                type='date'
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='event_venue'>イベント会場</label>
          <Controller
            defaultValue=''
            name='diary.event_venue'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_venue'
                label={
                  <span className={Form.text_label}>イベント会場を入力</span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '100%' }}
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='event_polaroid_count'>
            この日のチェキ枚数 (99枚以内)
          </label>
          <Controller
            defaultValue=''
            name='diary.event_polaroid_count'
            rules={{ max: 99, min: 0 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='event_polaroid_count'
                label={
                  <span className={Form.text_label}>
                    この日のチェキ数を入力
                  </span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '50%' }}
                type='number'
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='impressive_memory'>
            印象に残った出来事 (30文字以内)
          </label>
          <Controller
            defaultValue=''
            name='diary.impressive_memory'
            rules={{ maxLength: 30 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='impressive_memory'
                label={
                  <span className={Form.text_label}>
                    印象に残った出来事を入力
                  </span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '100%' }}
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='impressive_memory_detail'>
            印象に残った出来事の詳細 (140文字以内)
          </label>
          <Controller
            defaultValue=''
            name='diary.impressive_memory_detail'
            rules={{ maxLength: 140 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='impressive_memory_detail'
                label={
                  <span className={Form.text_label}>
                    印象に残った出来事を入力
                  </span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '100%' }}
                multiline={true}
                rows={5}
              />
            )}
          />
          <br />
          <br />
          <label htmlFor='status'>他のユーザーへの公開設定</label>
          <Controller
            name='diary.status'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  id='status'
                  {...field}
                  select={true}
                  focused
                  sx={{ backgroundColor: '#fff', width: '50%' }}
                  label={'公開設定'}
                >
                  <MenuItem value={'published'}>公開する</MenuItem>
                  <MenuItem value={'non_published'}>公開しない</MenuItem>
                </TextField>
              </>
            )}
          />
          {formState.errors.diary && (
            <div className={Form.text_error}>
              {formState.errors.diary.event_polaroid_count && (
                <>
                  <br />
                  <span>
                    ・チェキ枚数がおかしいです。レギュレーション違反です。
                  </span>
                </>
              )}
              {formState.errors.diary.impressive_memory && (
                <>
                  <br />
                  <span>・「印象に残った出来事」の文字数を超過しています</span>
                </>
              )}
              {formState.errors.diary.impressive_memory_detail && (
                <>
                  <br />
                  <span>
                    ・「印象に残った出来事の詳細」の文字数を超過しています
                  </span>
                </>
              )}
              {formState.errors.diary.status && (
                <>
                  <br />
                  <span>・公開設定が未設定です。</span>
                </>
              )}
              <br />
            </div>
          )}
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <input
              type='submit'
              className={Form.submit_button}
              value='この内容で登録'
            />
          </div>
        </form>
      </ThemeProvider>
    </>
  );
};

export default DiaryNewForm;
