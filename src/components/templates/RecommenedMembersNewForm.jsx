import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import { useNavigate } from 'react-router-dom';

import Form from './../../css/templates/Form.module.css';

const RecommenedMembersNewForm = () => {
  const navigate = useNavigate();
  const { useCreateRecommendedMembers } = useRecommendedMembersApi();
  const createRecommendedMember = useCreateRecommendedMembers();

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

  const onSubmit = (data) => {
    try {
      createRecommendedMember.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    navigate('/mypage');
  };
  return (
    <>
      <ThemeProvider theme={theme}>
        <form onSubmit={handleSubmit(onSubmit)} className={Form.form}>
          <h2 className={Form.form_title}>推しメン登録</h2>
          {formState.errors.recommended_member && (
            <>
              {formState.errors.recommended_member.nickname && (
                <>
                  <br />
                  <span className={Form.text_error}>
                    ・ニックネームが未入力です
                  </span>
                  <br />
                </>
              )}
            </>
          )}
          <br />

          <label htmlFor='nickname'>推しメンのニックネーム</label>

          <Controller
            name='recommended_member.nickname'
            rules={{ required: true }}
            control={control}
            render={({ field }) => (
              <TextField
                id='nickname'
                label={
                  <span className={Form.text_label}>
                    ここにニックネームを入力
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
          <label htmlFor='group'>推しメンの所属グループ</label>

          <Controller
            name='recommended_member.group'
            control={control}
            render={({ field }) => (
              <TextField
                id='group'
                label={
                  <span className={Form.text_label}>
                    ここに所属グループを入力
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
          <label htmlFor='first_met_date'>初めて会った日</label>

          <Controller
            defaultValue=''
            name='recommended_member.first_met_date'
            control={control}
            render={({ field }) => (
              <TextField
                id='first_met_date'
                type='date'
                label={
                  <span className={Form.text_label}>推しメンと会った日</span>
                }
                color='primary'
                focused
                {...field}
                sx={{ backgroundColor: '#fff', width: '50%' }}
              />
            )}
          />
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

export default RecommenedMembersNewForm;
