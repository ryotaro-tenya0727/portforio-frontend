import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';
import Form from './../../css/templates/Form.module.css';

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
      secondary: {
        main: '#000',
      },
    },
  });

  const { useShowRecommendedMember, usePutRecommendedMember } =
    useRecommendedMembersApi();

  const putRecommendedMember = usePutRecommendedMember(recommendedMemberId);

  let {
    data: recommendedMemberShow,
    isIdle,
    isLoading,
  } = useShowRecommendedMember(recommendedMemberId);

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
        <h2>編集フォーム</h2>

        {isIdle || isLoading ? (
          <h2>編集フォームローディング</h2>
        ) : (
          <>
            <form onSubmit={handleSubmit(onSubmit)} className={Form.form}>
              <h2 className={Form.form_title}>
                {`${recommendedMemberNickname}`}(グループ：{' '}
                {`${recommendedMemberGroup}`}) を編集中
              </h2>
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
                defaultValue={`${recommendedMemberShow.data.attributes.nickname}`}
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
                defaultValue={`${recommendedMemberShow.data.attributes.group}`}
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
                      <span className={Form.text_label}>
                        推しメンと会った日
                      </span>
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
          </>
        )}
      </ThemeProvider>
    </>
  );
};

export default RecommenedMemberEditForm;
