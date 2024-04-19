import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import LibraryMusicIcon from '@mui/icons-material/LibraryMusic';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import PhotoCameraBackIcon from '@mui/icons-material/PhotoCameraBack';
import OndemandVideoIcon from '@mui/icons-material/OndemandVideo';
import PhotoIcon from '@mui/icons-material/Photo';
import { useAuth0 } from '@auth0/auth0-react';

import { DiaryTrimmingModal } from './../organisms/Organisms';
import { DiaryVideoUploadArea } from './../organisms/Organisms';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';

import form from './../../css/templates/form.module.scss';
import button from './../../css/atoms/button.module.scss';

const DiaryNewForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [diaryImageUrls, setDiaryImageUrls] = useState([]);
  const [diaryVideoInformations, setDiaryVideoInformations] = useState({});
  const [displayImageArea, setDisplayImageArea] = useState(true);

  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { useCreateRecommendedMemberDiaries } =
    useRecommendedMemberDiariesApi();

  const createRecommendedMemberDiary = useCreateRecommendedMemberDiaries(
    recommendedMemberId,
    recommendedMemberUuid,
    recommendedMemberNickname,
    recommendedMemberGroup
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

  const onSubmit = async (data) => {
    const l = diaryImageUrls.length;
    const paramsDiaryImageUrls = [];
    [...Array(l)].map((_, index) => {
      paramsDiaryImageUrls.push({
        diary_image_url: diaryImageUrls[index].url,
      });
    });
    const params = {
      diary: {
        ...data.diary,
        diary_images_attributes: paramsDiaryImageUrls,
      },
    };
    console.log(diaryVideoInformations);
    if (Object.keys(diaryVideoInformations).length !== 0) {
      params.diary.diary_videos = diaryVideoInformations;
    }
    console.log(params);
    createRecommendedMemberDiary.mutate(params);
    setDiaryImageUrls([]);
    setDiaryVideoInformations({});
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        {/* <iframe
          title='diary-video'
          src='https://customer-6mlocqu6hlmvu4kt.cloudflarestream.com/5c296f7b17f6a19c8286fd68b56f2021/iframe'
          style={{ border: 'none' }}
          height='300'
          width='600'
          allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
          allowfullscreen='true'
        ></iframe> */}
        <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
          {isNumberError && (
            <p className={form.text_error}>
              ※2枚を超えて選択された画像は表示されません
            </p>
          )}
          {isFileTypeError && (
            <p className={form.text_error}>
              ※jpeg, png, bmp, gif, webp
              以外のファイル形式はアップロードできません
            </p>
          )}
          {displayImageArea ? (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                class={form.contentsWrapper}
              >
                <div class='formTitleContents'>
                  <PhotoIcon
                    sx={{
                      fontSize: '24px',
                      mb: '-6px',
                      mr: '10px',
                      color: '#ff66d1',
                    }}
                  />
                  日記の画像を2枚選択
                </div>
                <button
                  className={button.changeVideoButton}
                  onClick={() => {
                    setDisplayImageArea(false);
                  }}
                >
                  <OndemandVideoIcon
                    sx={{
                      fontSize: '18.5px',
                      mr: 1,
                      mb: '-5.5px',
                      color: '#ff6fc8',
                      '@media screen and (max-width:700px)': {
                        fontSize: '14.5px',
                        mr: 0.5,
                        mb: '-3.5px',
                      },
                    }}
                  />
                  動画にする
                </button>
              </div>
              <DiaryTrimmingModal
                onSetDiaryImageUrlAndIndex={(url, index) => {
                  setDiaryImageUrls([
                    ...diaryImageUrls,
                    { diary_image_index: index, url: url },
                  ]);
                }}
                onSetDiaryImageUrls={(urls) => {
                  setDiaryImageUrls(urls);
                }}
                diaryImageUrls={diaryImageUrls}
                onSetIsFileTypeError={(result) => setIsFileTypeError(result)}
                onSetIsNumberTypeError={(result) => setIsNumberError(result)}
              />
            </div>
          ) : (
            <div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
                class={form.contentsWrapper}
                onClick={(e) => {
                  e.preventDefault();
                }}
              >
                <div class='formTitleContents'>
                  <OndemandVideoIcon
                    sx={{
                      fontSize: '24px',
                      mb: '-6px',
                      mr: '10px',
                      color: '#ff66d1',
                    }}
                  />
                  日記の動画をアップロード
                </div>
                <button
                  className={button.changeVideoButton}
                  onClick={() => {
                    setDisplayImageArea(true);
                  }}
                >
                  <PhotoIcon
                    sx={{
                      fontSize: '18.5px',
                      mr: 1,
                      mb: '-5.5px',
                      color: '#ff6fc8',
                      '@media screen and (max-width:700px)': {
                        fontSize: '14.5px',
                        mr: 0.5,
                        mb: '-3.5px',
                      },
                    }}
                  />
                  画像にする
                </button>
              </div>
              <DiaryVideoUploadArea
                onSetDiaryVideoInformations={(informations) => {
                  setDiaryVideoInformations(informations);
                }}
              />
            </div>
          )}

          <br />
          <div htmlFor='event_name' class='formTitle'>
            {' '}
            <LibraryMusicIcon
              sx={{ fontSize: '24px', mb: '-7px', mr: '10px', color: 'red' }}
            />
            イベント名 (25文字以内)
          </div>
          <Controller
            defaultValue=''
            rules={{ maxLength: 25 }}
            name='diary.event_name'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_name'
                div={
                  <span className={form.text_div}>
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
          <div htmlFor='event_date' class='formTitle'>
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
          </div>
          <Controller
            defaultValue=''
            name='diary.event_date'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_date'
                div={
                  <span className={form.text_div}>
                    {' '}
                    <CalendarMonthIcon
                      sx={{
                        fontSize: '24px',
                        mb: '-5px',
                        mr: '10px',
                        color: '#ff64db',
                      }}
                    />
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
          <div htmlFor='event_venue' class='formTitle'>
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
          </div>
          <Controller
            defaultValue=''
            rules={{ maxLength: 25 }}
            name='diary.event_venue'
            control={control}
            render={({ field }) => (
              <TextField
                id='event_venue'
                div={
                  <span className={form.text_div}>
                    {' '}
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
          <div htmlFor='event_polaroid_count' class='formTitle'>
            <PhotoCameraBackIcon
              sx={{
                fontSize: '23px',
                mb: '-5px',
                mr: '10px',
                color: '#FF8C00',
              }}
            />
            この日のチェキ枚数 (99枚以内)
          </div>
          <Controller
            defaultValue='0'
            name='diary.event_polaroid_count'
            rules={{ max: 99, min: 0 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='event_polaroid_count'
                div={
                  <span className={form.text_div}>
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
          <div htmlFor='impressive_memory' class='formTitle'>
            印象に残った出来事 (30文字以内)
          </div>
          <Controller
            defaultValue=''
            name='diary.impressive_memory'
            rules={{ maxLength: 30 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='impressive_memory'
                div={
                  <span className={form.text_div}>
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
          <div htmlFor='impressive_memory_detail' class='formTitle'>
            印象に残った出来事の詳細
          </div>
          <Controller
            defaultValue=''
            name='diary.impressive_memory_detail'
            rules={{ maxLength: 60000 }}
            control={control}
            render={({ field }) => (
              <TextField
                id='impressive_memory_detail'
                div={
                  <span className={form.text_div}>
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
          <div htmlFor='status' class='formTitle'>
            トップページでの公開を許可する？
          </div>
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
                  div={'公開設定'}
                >
                  <MenuItem value={'published'}>する</MenuItem>
                  <MenuItem value={'non_published'}>しない</MenuItem>
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
            </div>
          )}
          <br />
          <br />
          <div style={{ textAlign: 'center' }}>
            <input
              type='submit'
              className={button.submit_button}
              value='この内容で登録'
            />
          </div>
        </form>
      </ThemeProvider>
    </>
  );
};

export default DiaryNewForm;
