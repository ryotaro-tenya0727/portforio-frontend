import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import PersonIcon from '@mui/icons-material/Person';
import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import { Circular } from './../atoms/atoms';
import { Button } from './../atoms/atoms';

import { useProfileApi } from './../../hooks/useProfile';

import { ProfileTrimmingModal } from './../organisms/Organisms';

import button from './../../css/atoms/button.module.scss';
import form from './../../css/templates/form.module.scss';

const ProfileEditForm = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff96df',
      },
    },
  });
  const { useGetProfile, usePutProfile } = useProfileApi();
  const { data: userData, isLoading } = useGetProfile();
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [diaryImageUrl, setDiaryImageUrl] = useState(null);
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const putProfile = usePutProfile();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    data.profile.user_image = diaryImageUrl;
    putProfile.mutate(data);
  };
  if (isLoading) {
    return (
      <div
        style={{
          textAlign: 'center',
        }}
      >
        <Circular large={80} small={60} top={120} />
      </div>
    );
  }
  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
            <img
              src={`${imageDomain}/admin/diary_header-min.png`}
              alt='picture'
              className={form.form_header_image}
            />
            {formState.errors.profile && (
              <>
                {formState.errors.profile && (
                  <>
                    {formState.errors.profile.name.type === 'required' && (
                      <>
                        <br />
                        <span className={form.text_error}>
                          ・名前が未入力です
                        </span>
                        <br />
                      </>
                    )}
                  </>
                )}
              </>
            )}
            {isNumberError && (
              <p className={form.text_error}>
                ※2枚を超えて選択された画像は表示されません
              </p>
            )}
            {isFileTypeError && (
              <p className={form.text_error}>
                ※jpeg, png, bmp, gif 以外のファイル形式はアップロードできません
              </p>
            )}
            <br />
            <label htmlFor='user_image'>
              <AddAPhotoIcon
                sx={{
                  fontSize: '20px',
                  mb: '-3px',
                  mr: '10px',
                  color: '#ff66d1',
                }}
              />
              アイコン
            </label>
            <ProfileTrimmingModal
              onSetDiaryImageUrl={(url) => {
                setDiaryImageUrl(url);
              }}
              diaryImageUrl={diaryImageUrl}
              onSetIsFileTypeError={(result) => setIsFileTypeError(result)}
              onSetIsNumberTypeError={(result) => setIsNumberError(result)}
              defaultImage={userData.user_image}
            />
            <br />
            <label htmlFor='name'>
              <AutoAwesomeIcon
                sx={{
                  fontSize: '20px',
                  mb: '-3px',
                  mr: '10px',
                  color: '#FF8C00',
                }}
              />
              名前
            </label>
            <Controller
              defaultValue={userData.name}
              name='profile.name'
              rules={{ required: true, maxLength: 8 }}
              control={control}
              render={({ field }) => (
                <TextField
                  id='name'
                  label={
                    <span className={form.text_label}>
                      <AutoAwesomeIcon
                        sx={{
                          fontSize: '20px',
                          mb: '-3px',
                          mr: '10px',
                          color: '#ff64db',
                        }}
                      />
                      ここに名前を入力
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

            <label htmlFor='me_introduction'>
              {' '}
              <PersonIcon
                sx={{ fontSize: '22px', mb: '-5px', mr: '10px', color: 'red' }}
              />
              自己紹介
            </label>
            <Controller
              defaultValue={userData.me_introduction}
              name='profile.me_introduction'
              control={control}
              render={({ field }) => (
                <TextField
                  id='me_introduction'
                  label={
                    <span className={form.text_label}>
                      <PersonIcon
                        sx={{
                          fontSize: '22px',
                          mb: '-5px',
                          mr: '10px',
                          color: '#ff64db',
                        }}
                      />
                      ここに自己紹介を入力
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
            <div style={{ textAlign: 'center' }}>
              <input
                type='submit'
                className={button.submit_button}
                value='この内容で登録'
              />
            </div>
          </form>
        </>
      </ThemeProvider>
    </>
  );
};

export default ProfileEditForm;
