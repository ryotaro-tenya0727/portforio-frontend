import { ReactQueryDevtools } from 'react-query/devtools';
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import CircularProgress from '@mui/material/CircularProgress';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';

import { Button } from './../atoms/atoms';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

import form from './../../css/templates/form.module.css';
import button from './../../css/atoms/button.module.css';

const RecommenedMemberDiaryEditForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
  diaryId,
}) => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
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
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const {
    useShowRecommendedMemberDiary,
    usePutRecommendedMemberDiary,
    useDeleteRecommendedMemberDiary,
  } = useRecommendedMemberDiariesApi();

  let {
    data: diaryShow,
    isIdle,
    isLoading,
  } = useShowRecommendedMemberDiary(diaryId);
  diaryShow = diaryShow && diaryShow.data.attributes;

  const putRecommendedMemberDiary = usePutRecommendedMemberDiary(
    recommendedMemberId,
    diaryId
  );

  const deleteRecommendedMemberDiary = useDeleteRecommendedMemberDiary(
    recommendedMemberId,
    diaryId
  );

  const deleteDiary = () => {
    if (
      window.confirm(
        `本当に${recommendedMemberNickname}との日記を削除しますか?`
      )
    ) {
      deleteRecommendedMemberDiary.mutate();
      navigate(
        `/recommended-member/${recommendedMemberUuid}/diaries/${recommendedMemberId}?nickname=${recommendedMemberNickname}&group=${recommendedMemberGroup}`
      );
    }
  };

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
  // isIdle || isLoading
  return (
    <>
      {isIdle || isLoading ? (
        <div
          style={{
            textAlign: 'center',
          }}
        >
          <CircularProgress
            size={130}
            sx={{ mt: '150px', color: '#ff7bd7', mb: '20px' }}
          />
          <br />
          <p style={{ fontSize: '22px' }}>ロード中</p>
        </div>
      ) : (
        <>
          <ThemeProvider theme={theme}>
            <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
              <p className={form.form_title} style={{ marginTop: '20px' }}>
                {' '}
                <img
                  src={`${imageDomain}/admin/diary_title-min.png`}
                  alt='picture'
                  width={30}
                  style={{ margin: '5px 10px 2px 0px' }}
                />
                {`${recommendedMemberNickname}との日記編集中`}
              </p>
              <br />
              <label htmlFor='event_name'>
                {' '}
                <LibraryMusicIcon
                  sx={{
                    fontSize: '24px',
                    mb: '-7px',
                    mr: '10px',
                    color: 'red',
                  }}
                />
                イベント名 (25文字以内)
              </label>
              <Controller
                defaultValue={`${diaryShow.event_name}`}
                rules={{ maxLength: 25 }}
                name='diary.event_name'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='event_name'
                    label={
                      <span className={form.text_label}>
                        {' '}
                        <LibraryMusicIcon
                          sx={{
                            fontSize: '24px',
                            mb: '-7px',
                            mr: '10px',
                            color: '#ff64db',
                          }}
                        />
                        イベント名を入力
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
              <label htmlFor='event_date'>
                {' '}
                <CalendarMonthIcon
                  sx={{
                    fontSize: '24px',
                    mb: '-5px',
                    mr: '10px',
                    color: '#3300FF',
                  }}
                />
                イベントの日付
              </label>
              <Controller
                defaultValue={`${diaryShow.event_date}`}
                name='diary.event_date'
                control={control}
                render={({ field }) => (
                  <TextField
                    id='event_date'
                    label={
                      <span className={form.text_label}>
                        <CalendarMonthIcon
                          sx={{
                            fontSize: '24px',
                            mb: '-5px',
                            mr: '10px',
                            color: '#ff64db',
                          }}
                        />{' '}
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
              <label htmlFor='event_venue'>
                {' '}
                <AccountBalanceIcon
                  sx={{
                    fontSize: '23px',
                    mb: '-5px',
                    mr: '10px',
                    color: '#00AA00',
                  }}
                />
                イベント会場 (25文字以内)
              </label>
              <Controller
                defaultValue={`${diaryShow.event_venue}`}
                name='diary.event_venue'
                rules={{ maxLength: 25 }}
                control={control}
                render={({ field }) => (
                  <TextField
                    id='event_venue'
                    label={
                      <span className={form.text_label}>
                        <AccountBalanceIcon
                          sx={{
                            fontSize: '23px',
                            mb: '-5px',
                            mr: '10px',
                            color: '#ff64db',
                          }}
                        />
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
              <label htmlFor='event_polaroid_count'>
                {' '}
                <PhotoCameraBackIcon
                  sx={{
                    fontSize: '23px',
                    mb: '-5px',
                    mr: '10px',
                    color: '#FF8C00',
                  }}
                />
                この日のチェキ枚数
              </label>
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
                        <PhotoCameraBackIcon
                          sx={{
                            fontSize: '23px',
                            mb: '-5px',
                            mr: '10px',
                            color: '#ff64db',
                          }}
                        />
                        この日のチェキ数を入力
                      </span>
                    }
                    color='primary'
                    focused
                    {...field}
                    sx={{ backgroundColor: '#fff', width: '50%' }}
                    InputProps={{ inputProps: { min: 0 } }}
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
                  {formState.errors.diary.event_name && (
                    <>
                      <br />
                      <span>・「イベント名」の文字数を超過しています</span>
                    </>
                  )}
                  {formState.errors.diary.event_venue && (
                    <>
                      <br />
                      <span>・「イベント会場」の文字数を超過しています</span>
                    </>
                  )}
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
            <div style={{ textAlign: 'center', marginTop: '50px' }}>
              <Button className={button.delete} onClick={deleteDiary}>
                <BrokenImageIcon
                  sx={{
                    fontSize: '20px',
                    mb: '-4.5px',
                    mr: '3px',
                  }}
                />
                この日記を削除
              </Button>
            </div>
          </ThemeProvider>
          <ReactQueryDevtools initialIsOpen={false} />
        </>
      )}
    </>
  );
};

export default RecommenedMemberDiaryEditForm;
