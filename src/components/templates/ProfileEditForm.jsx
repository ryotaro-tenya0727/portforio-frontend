import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsIcon from '@mui/icons-material/Groups';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';
import { Button } from './../atoms/atoms';

import { useProfileApi } from './../../hooks/useProfile';

import button from './../../css/atoms/button.module.scss';
import form from './../../css/templates/form.module.css';

const ProfileEditForm = () => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff96df',
      },
    },
  });
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const { usePutProfile } = useProfileApi();
  const putProfile = usePutProfile();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const onSubmit = (data) => {
    // putProfile.mutate(data);
    console.log(data);
  };
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
                    {formState.errors.profile.name.type === 'maxLength' && (
                      <>
                        <br />
                        <span className={form.text_error}>
                          ・名前が文字数を超過しています
                        </span>
                        <br />
                      </>
                    )}
                  </>
                )}
              </>
            )}
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
              <GroupsIcon
                sx={{ fontSize: '22px', mb: '-5px', mr: '10px', color: 'red' }}
              />
              自己紹介
            </label>
            <Controller
              name='profile.me_introduction'
              control={control}
              render={({ field }) => (
                <TextField
                  id='me_introduction'
                  label={
                    <span className={form.text_label}>
                      <GroupsIcon
                        sx={{
                          fontSize: '22px',
                          mb: '-5px',
                          mr: '10px',
                          color: '#ff64db',
                        }}
                      />
                      自己紹介
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
                className={form.submit_button}
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
