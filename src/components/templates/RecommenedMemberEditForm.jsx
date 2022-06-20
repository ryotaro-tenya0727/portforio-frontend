import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import form from './../../css/templates/form.module.css';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

const RecommenedMemberEditForm = ({
  recommendedMemberUuid,
  recommendedMemberId,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
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
    },
  });

  const { usePutRecommendedMember } = useRecommendedMembersApi();
  const putRecommendedMember = usePutRecommendedMember(recommendedMemberId);

  const onSubmit = (data) => {
    try {
      putRecommendedMember.mutate(data);
    } catch (error) {
      console.error(error.response.data);
    }
    navigate('/mypage');
  };

  return (
    <>
      <ThemeProvider theme={theme}>
        <>
          <form onSubmit={handleSubmit(onSubmit)} className={form.form}>
            <h2 className={form.form_title}>
              {`${recommendedMemberNickname}`}(グループ：{' '}
              {`${recommendedMemberGroup}`}) を編集中
            </h2>
            {formState.errors.recommended_member && (
              <>
                {formState.errors.recommended_member && (
                  <>
                    {formState.errors.recommended_member.nickname.type ===
                      'required' && (
                      <>
                        <br />
                        <span className={form.text_error}>
                          ・ニックネームが未入力です
                        </span>
                        <br />
                      </>
                    )}
                    {formState.errors.recommended_member.nickname.type ===
                      'maxLength' && (
                      <>
                        <br />
                        <span className={form.text_error}>
                          ・ニックネームが文字数を超過しています
                        </span>
                        <br />
                      </>
                    )}

                    {formState.errors.recommended_member.group && (
                      <>
                        {console.log(formState.errors)}
                        <br />
                        <span className={form.text_error}>
                          ・所属グループが文字数を超過しています
                        </span>
                        <br />
                      </>
                    )}
                  </>
                )}
              </>
            )}
            <br />
            <label htmlFor='nickname'>
              推しメンのニックネーム 推しメンのニックネーム (8文字以内 )
            </label>
            <Controller
              defaultValue={`${recommendedMemberNickname}`}
              name='recommended_member.nickname'
              rules={{ required: true, maxLength: 8 }}
              control={control}
              render={({ field }) => (
                <TextField
                  id='nickname'
                  label={
                    <span className={form.text_label}>
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
            <label htmlFor='group'>推しメンの所属グループ (15文字以内)</label>
            <Controller
              defaultValue={`${recommendedMemberGroup}`}
              name='recommended_member.group'
              control={control}
              rules={{ maxLength: 15 }}
              render={({ field }) => (
                <TextField
                  id='group'
                  label={
                    <span className={form.text_label}>
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
                    <span className={form.text_label}>推しメンと会った日</span>
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

export default RecommenedMemberEditForm;
