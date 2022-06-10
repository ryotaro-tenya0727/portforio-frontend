import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import form from './../../css/templates/form.module.css';

const RecommenedMemberDiaryEditForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
  diaryId,
}) => {
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { useShowRecommendedMemberDiary, usePutRecommendedMemberDiary } =
    useRecommendedMemberDiariesApi();

  const putRecommendedMemberDiary = usePutRecommendedMemberDiary(
    recommendedMemberId,
    diaryId
  );

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
      {isIdle || isLoading ? (
        <h2>編集フォームローディング</h2>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
              <h1
                className={form.form_title}
              >{`${recommendedMemberNickname}との日記編集中`}</h1>
              <label htmlFor='event_name'>イベント名</label>
              <Controller
                defaultValue={`${diaryShow.event_name}`}
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
                      <span className={form.text_label}>
                        イベントの日付を入力
                      </span>
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
                defaultValue={`${diaryShow.event_venue}`}
                name='diary.event_venue'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='event_venue'
                    label={
                      <span className={form.text_label}>
                        イベント会場を入力
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
              <label htmlFor='event_polaroid_count'>この日のチェキ枚数</label>
              <Controller
                defaultValue={`${diaryShow.event_polaroid_count}`}
                name='diary.event_polaroid_count'
                rules={{ max: 99 }}
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
                defaultValue={`${diaryShow.impressive_memory}`}
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
                defaultValue={`${diaryShow.impressive_memory_detail}`}
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
                name='diary.status'
                rules={{ required: true }}
                control={control}
                defaultValue={'published'}
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
                        ・チェキ枚数が多すぎです。レギュレーション違反です。
                      </span>
                    </>
                  )}
                  {formState.errors.diary.impressive_memory && (
                    <>
                      <br />
                      <span>
                        ・「印象に残った出来事」の文字数を超過しています
                      </span>
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
      )}
    </>
  );
};

export default RecommenedMemberDiaryEditForm;
