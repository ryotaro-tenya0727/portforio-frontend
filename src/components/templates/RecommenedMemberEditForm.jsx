import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import GroupsIcon from '@mui/icons-material/Groups';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import BrokenImageIcon from '@mui/icons-material/BrokenImage';

import { Button } from './../atoms/atoms';
import form from './../../css/templates/form.module.css';
import { useRecommendedMembersApi } from './../../hooks/useRecommendedMembers';

import button from './../../css/atoms/button.module.css';

const RecommenedMemberEditForm = ({
  recommendedMemberUuid,
  recommendedMemberId,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const theme = createTheme({
    palette: {
      primary: {
        main: '#ff96df',
      },
    },
  });
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });

  const { usePutRecommendedMember } = useRecommendedMembersApi();
  const putRecommendedMember = usePutRecommendedMember(recommendedMemberId);

  const { useDeleteRecommendedMember } = useRecommendedMembersApi();
  const deleteRecommendedMember =
    useDeleteRecommendedMember(recommendedMemberId);

  const deleteMember = () => {
    if (
      window.confirm(
        `本当に${recommendedMemberNickname}を削除しますか?${recommendedMemberNickname}との日記も削除されます.
      `
      )
    ) {
      deleteRecommendedMember.mutate();
      navigate('/mypage');
    }
  };

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
            <img
              src={`${imageDomain}/admin/diary_header-min.png`}
              alt='picture'
              className={form.form_header_image}
            />
            <p className={form.form_title}>
              {`${recommendedMemberNickname}`}(グループ：{' '}
              {`${recommendedMemberGroup}`}) を編集中
            </p>
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
              <AutoAwesomeIcon
                sx={{
                  fontSize: '20px',
                  mb: '-3px',
                  mr: '10px',
                  color: '#FF8C00',
                }}
              />
              推しメンのニックネーム (8文字以内 )
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
                      <AutoAwesomeIcon
                        sx={{
                          fontSize: '20px',
                          mb: '-3px',
                          mr: '10px',
                          color: '#ff64db',
                        }}
                      />
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

            <label htmlFor='group'>
              {' '}
              <GroupsIcon
                sx={{ fontSize: '22px', mb: '-5px', mr: '10px', color: 'red' }}
              />
              推しメンの所属グループ (15文字以内)
            </label>
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
                      <GroupsIcon
                        sx={{
                          fontSize: '22px',
                          mb: '-5px',
                          mr: '10px',
                          color: '#ff64db',
                        }}
                      />
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
            <label htmlFor='first_met_date'>
              {' '}
              <VolunteerActivismIcon
                sx={{
                  fontSize: '21px',
                  mb: '-3px',
                  mr: '7px',
                  color: '#FF1493',
                }}
              />
              初めて会った日
            </label>
            <Controller
              defaultValue=''
              name='recommended_member.first_met_date'
              control={control}
              render={({ field }) => (
                <TextField
                  id='first_met_date'
                  type='date'
                  label={
                    <span className={form.text_label}>
                      {' '}
                      <VolunteerActivismIcon
                        sx={{
                          fontSize: '21px',
                          mb: '-3px',
                          mr: '7px',
                          color: '#ff64db',
                        }}
                      />
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
                className={form.submit_button}
                value='この内容で登録'
              />
            </div>
          </form>
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <Button className={button.delete} onClick={deleteMember}>
              <BrokenImageIcon
                sx={{
                  fontSize: '20px',
                  mb: '-4.5px',
                  mr: '3px',
                }}
              />
              推しメンを削除
            </Button>
          </div>
        </>
      </ThemeProvider>
    </>
  );
};

export default RecommenedMemberEditForm;
