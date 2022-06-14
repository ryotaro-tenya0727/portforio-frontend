import { useState, useContext, useCallback, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm, Controller } from 'react-hook-form';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Cropper from 'react-cropper';

import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AuthGuardContext } from './../../providers/AuthGuard';
import { SampleImageButton } from './../atoms/atoms';
import { useRecommendedMemberDiariesApi } from './../../hooks/useRecommendedMemberDiaries';
import { s3PresignedUrlRepository } from './../../repositories/s3PresignedUrlRepository';
import form from './../../css/templates/form.module.css';
import button from './../../css/atoms/button.module.css';

const DiaryNewForm = ({
  recommendedMemberId,
  recommendedMemberUuid,
  recommendedMemberNickname,
  recommendedMemberGroup,
}) => {
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [isNumberError, setIsNumberError] = useState(false);
  const [isFileTypeError, setIsFileTypeError] = useState(false);
  const [s3ImageUrls, setImageUrls] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const { accessToken } = useContext(AuthGuardContext);
  const navigate = useNavigate();
  const { control, handleSubmit, formState } = useForm({
    mode: 'onSubmit',
    reValidateMode: 'onChange',
  });
  const cropperRef = useRef(null);
  const onCrop = () => {
    const imageElement = cropperRef?.current;
    const cropper = imageElement?.cropper;
    console.log(cropper.getCroppedCanvas().toDataURL());
  };

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

  const resetErrors = () => {
    setIsNumberError(false);
    setIsFileTypeError(false);
  };

  const firstFileUpload = () => {
    firstInputRef.current.click();
  };

  const secondFileUpload = () => {
    secondInputRef.current.click();
  };

  const firstHandleFile = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    resetErrors();
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
    ) {
      setIsFileTypeError(true);
      return;
    }
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: file.name,
        },
      },
      accessToken
    );
    if (imageFiles.length >= 2) {
      setIsNumberError(true);
      return;
    }
    setFirstImage(file);
    // 一つ目なら先頭に入れる。
    setImageUrls([imageUrls, ...s3ImageUrls]);
    setImageFiles([file, ...imageFiles]);
    event.target.value = '';
  };

  const secondHandleFile = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    resetErrors();
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
    ) {
      setIsFileTypeError(true);
      return;
    }
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: file.name,
        },
      },
      accessToken
    );
    if (imageFiles.length >= 2) {
      setIsNumberError(true);
      return;
    }
    setSecondImage(file);
    // 二つ目なら後ろに入れる。
    setImageUrls([...s3ImageUrls, imageUrls]);
    setImageFiles([...imageFiles, file]);
    event.target.value = '';
  };

  const handleCancel = (imageIndex) => {
    if (window.confirm('選択した画像を消してよろしいですか？')) {
      resetErrors();
      if (imageIndex === 0) {
        setFirstImage(null);
      } else {
        setSecondImage(null);
      }
      const modifyPhotos = imageFiles.concat();
      if (modifyPhotos.length === 1) {
        setImageFiles([]);
        setImageUrls([]);
        return;
      }
      modifyPhotos.splice(imageIndex, 1);
      setImageFiles(modifyPhotos);
      const modifyImageUrls = s3ImageUrls.concat();
      modifyImageUrls.splice(imageIndex, 1);
      setImageUrls(modifyImageUrls);
    }
  };
  const onSubmit = async (data) => {
    const l = s3ImageUrls.length;
    if (s3ImageUrls.length !== 0) {
      [...Array(l)].map(async (_, index) => {
        await axios.put(s3ImageUrls[index].presigned_url, imageFiles[index], {
          headers: {
            'Content-Type': 'image/*',
          },
        });
      });
    }

    const paramsDiaryImageUrls = [];
    [...Array(l)].map((_, index) => {
      paramsDiaryImageUrls.push({
        diary_image_url: s3ImageUrls[index].diary_image_url,
      });
    });

    createRecommendedMemberDiary.mutate({
      diary: { ...data.diary, diary_images_attributes: paramsDiaryImageUrls },
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
          <Button onClick={handleOpen}>Open modal</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              <Typography id='modal-modal-title' variant='h6' component='h2'>
                Text in a modal
              </Typography>
              <Typography id='modal-modal-description' sx={{ mt: 2 }}>
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
              </Typography>
            </Box>
          </Modal>

          <div className={form.images}>
            {firstImage !== null ? (
              <div>
                <button
                  className={button.image_cancel_button}
                  type='button'
                  onClick={() => handleCancel(0)}
                >
                  <DeleteForeverIcon />
                </button>
                <img
                  src={URL.createObjectURL(firstImage)}
                  alt={`あなたの写真 `}
                  width='200'
                  height='200'
                />
              </div>
            ) : (
              <SampleImageButton onClick={firstFileUpload} />
            )}
            {secondImage !== null ? (
              <div>
                <button
                  className={button.image_cancel_button}
                  type='button'
                  onClick={() => handleCancel(1)}
                >
                  <DeleteForeverIcon />
                </button>

                <img
                  src={URL.createObjectURL(secondImage)}
                  alt={`あなたの写真 `}
                  width='200'
                  height='200'
                />
              </div>
            ) : (
              <SampleImageButton onClick={secondFileUpload} />
            )}
          </div>
          <input
            ref={firstInputRef}
            type='file'
            accept='image/*'
            onChange={(event) => firstHandleFile(event)}
            hidden
          />
          <input
            ref={secondInputRef}
            type='file'
            accept='image/*'
            onChange={(event) => secondHandleFile(event)}
            hidden
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
