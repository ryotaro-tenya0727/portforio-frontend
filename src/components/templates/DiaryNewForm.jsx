import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { TrimmingModal } from './../organisms/Organisms';
import form from './../../css/templates/form.module.css';

const DiaryNewForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [s3ImageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { useCreateRecommendedMemberDiaries } =
    useRecommendedMemberDiariesApi();

  const createRecommendedMemberDiary =
    useCreateRecommendedMemberDiaries(recommendedMemberId);

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

  const onSubmit = async (data) => {
    const l = s3ImageUrls.length;
    console.log(s3ImageUrls);
    console.log(imageFiles);
    if (l !== 0) {
      [...Array(l)].map(async (_, index) => {
        await axios.put(s3ImageUrls[index].presigned_url, imageFiles[index], {
          headers: {
            'Content-Type': 'image/*',
          },
        });
      });
      const paramsDiaryImageUrls = [];
      [...Array(l)].map((_, index) => {
        paramsDiaryImageUrls.push({
          diary_image_url: s3ImageUrls[index].diary_image_url,
        });
      });

      createRecommendedMemberDiary.mutate({
        diary: {
          ...data.diary,
          diary_images_attributes: paramsDiaryImageUrls,
        },
      });
      navigate(
        `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
      );
      return;
    }

    createRecommendedMemberDiary.mutate({
      diary: { ...data.diary },
    });
    navigate(
      `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
    );
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          <h1
            className={form.form_title}
          >{`${recommendedMemberNickname}との日記追加中`}</h1>
          <br />
          {isNumberError && <p>※2枚を超えて選択された画像は表示されません</p>}
          {isFileTypeError && (
            <p>※jpeg, png, bmp, gif, svg以外のファイル形式は表示されません</p>
          )}
          <TrimmingModal
            imageFiles={imageFiles}
            s3ImageUrls={s3ImageUrls}
            // first
            onSetFirstImageFiles={(image) => {
              setImageFiles([image, ...imageFiles]);
            }}
            onSetFirstImageUrls={(imageUrls) =>
              setImageUrls([imageUrls, ...s3ImageUrls])
            }
            // second
            onSetSecondImageFiles={(image) => {
              setImageFiles([...imageFiles, image]);
            }}
            onSetSecondImageUrls={(imageUrls) =>
              setImageUrls([...s3ImageUrls, imageUrls])
            }
            //reset
            onSetResetImageFiles={() => {
              setImageFiles([]);
              console.log('初期化');
            }}
            onSetResetImageUrls={() => {
              setImageUrls([]);
            }}
            //modify
            onSetModifyImageFiles={(files) => {
              setImageFiles(files);
            }}
            onSetModifyImageUrls={(urls) => {
              setImageUrls(urls);
            }}
            onSetIsFileTypeError={(result) => setIsFileTypeError(result)}
            onSetIsNumberTypeError={(result) => setIsNumberError(result)}
          />

          <br />
          <label htmlFor='event_name'>イベント名</label>
          <Controller
            defaultValue=''
            name='diary.event_name'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_name'
                label={
                  <span className={form.text_label}>イベント名を入力</span>
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
                  <span className={form.text_label}>イベントの日付を入力</span>
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
                  <span className={form.text_label}>イベント会場を入力</span>
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
                  <span className={form.text_label}>
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
                  <span className={form.text_label}>
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
                  <span className={form.text_label}>
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
            defaultValue=''
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
            <div className={form.text_error}>
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
              className={form.submit_button}
              value='この内容で登録'
            />
          </div>
        </form>
      </ThemeProvider>
    </>
  );
};

export default DiaryNewForm;
