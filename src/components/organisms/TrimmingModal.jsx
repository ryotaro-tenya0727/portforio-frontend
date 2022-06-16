import { useState, useContext, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';

import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';

import { AuthGuardContext } from './../../providers/AuthGuard';
import { SampleImageButton } from './../atoms/atoms';
import { s3PresignedUrlRepository } from './../../repositories/s3PresignedUrlRepository';
import form from './../../css/templates/form.module.css';
import button from './../../css/atoms/button.module.css';
import card from './../../css/organisms/card.module.css';

const TrimmingModal = ({
  onSetIsFileTypeError,
  onSetIsNumberTypeError,
  imageFiles,
  s3ImageUrls,
  onSetFirstImageFiles,
  onSetFirstImageUrls,
  onSetResetImageFiles,
  onSetResetImageUrls,
  onSetModifyImageFiles,
  onSetModifyImageUrls,
}) => {
  const { accessToken } = useContext(AuthGuardContext);
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const firstInputRef = useRef(null);
  const secondInputRef = useRef(null);
  const [firstImage, setFirstImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [cropConfig, setCropConfig] = useState(
    // default crop config
    // トリミングする四角形のサイズ
    {
      unit: 'px', // Can be 'px' or '%'
      x: 20,
      y: 20,
      width: 40,
      height: 40,
      aspect: 1,
    }
  );
  const [croppedImage, SetCroppedImage] = useState(null);
  const [madeUrls, SetMadeUrls] = useState(null);
  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '70%',
    height: '70%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    paddingBottom: '64px',
    textAlign: 'center',
  };

  const [imageRef, setImageRef] = useState();

  const resetErrors = () => {
    onSetIsFileTypeError(false);
    onSetIsNumberTypeError(false);
  };

  const firstFileClick = () => {
    firstInputRef.current.click();
  };

  const firstFileUpload = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    resetErrors();
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
    ) {
      onSetIsFileTypeError(true);
      return;
    }

    if (imageFiles.length >= 2) {
      onSetIsNumberTypeError(true);
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
    SetMadeUrls(imageUrls);
    const reader = new FileReader();

    // readAsDataURLでファイルを読み込むと発動
    reader.addEventListener('load', () => {
      const image = reader.result;
      // ここでリサイズする画像を格納
      setImageToCrop(image);
    });

    reader.readAsDataURL(event.target.files[0]);

    setOpen(true);

    // console.log(imageUrls);
    event.target.value = '';
    // ここでリサイズする画像を格納
  };

  // const secondFileClick = () => {
  //   secondInputRef.current.click();
  // };

  const cropImage = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        `CropImage.png` // destination filename
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedImage(croppedImage);
    }
  };

  const registerImage = () => {
    setFirstImage(croppedImage);
    onSetFirstImageFiles(croppedImage);
    onSetFirstImageUrls(madeUrls);
    handleClose();
  };

  // このまま
  const handleCancel = (imageIndex) => {
    if (window.confirm('選択した画像を消してよろしいですか？')) {
      resetErrors();
      if (imageIndex === 0) {
        setFirstImage(null);
      } else {
        setSecondImage(null);
      }
      const modifyFiles = imageFiles.concat();
      if (modifyFiles.length === 1) {
        console.log('reset');
        onSetResetImageFiles();
        onSetResetImageUrls();
        console.log(imageFiles);
        return;
      }
      modifyFiles.splice(imageIndex, 1);
      onSetModifyImageFiles(modifyFiles);
      const modifyImageUrls = s3ImageUrls.concat();
      modifyImageUrls.splice(imageIndex, 1);
      onSetModifyImageUrls(modifyImageUrls);
    }
  };
  console.log(imageFiles);
  console.log(s3ImageUrls);
  const getCroppedImage = (sourceImage, cropConfig, fileName) => {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    canvas.width = cropConfig.width;
    canvas.height = cropConfig.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width,
      cropConfig.height
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob((blob) => {
        // returning an error
        if (!blob) {
          reject(new Error('Canvas is empty'));
          return;
        }

        blob.name = fileName;

        resolve(blob);
      }, 'image/png');
    });
  };

  return (
    <div>
      <input
        ref={firstInputRef}
        type='file'
        accept='image/*'
        onChange={(event) => firstFileUpload(event)}
        hidden
      />

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
        <SampleImageButton onClick={firstFileClick} />
      )}
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={card.trimming_card}>
            <ReactCrop
              style={
                {
                  // minHeight: '90%',
                  // width: '90%',
                  // height: '100%',
                  // position: 'absolute',
                  // top: '50%',
                  // left: '50%',
                  // transform: 'translate(-50%, -50%)',
                  // height: '90%',
                  // paddingTop: '6px',
                }
              }
              src={imageToCrop}
              crop={cropConfig}
              ruleOfThirds
              // 画像選択時
              onImageLoaded={(imageRef) => {
                // console.log('画像選択');
                console.log(imageRef.class);
                // console.log(imageRef.width);
                // <img ...>がimageRefに入る
                // imageRef.width = '300px';
                setImageRef(imageRef);
              }}
              // リサイズ中(マウスを持っているとき)
              onChange={(cropConfig) => {
                // console.log('onChange');
                setCropConfig(cropConfig);
              }}
              // リサイズ後（マウス離したとき）
              onComplete={(cropConfig) => {
                // console.log('リサイズ');
                cropImage(cropConfig);
              }}
              crossorigin='anonymous' // to avoid CORS-related problems
            />
          </div>
          <button onClick={registerImage} className={button.button_trimming}>
            確定
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default TrimmingModal;
