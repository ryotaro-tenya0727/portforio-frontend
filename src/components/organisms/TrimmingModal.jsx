import { useState, useContext, useCallback, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import 'react-image-crop/dist/ReactCrop.css';

import { SampleImageButton } from './../atoms/atoms';
import { AuthGuardContext } from './../../providers/AuthGuard';
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
  onSetSecondImageFiles,
  onSetSecondImageUrls,
}) => {
  const { accessToken } = useContext(AuthGuardContext);
  // 画像アップロード時にセット
  const [imageRef, setImageRef] = useState();
  // リサイズ中に変化するリサイズ後のサイズ
  const [cropConfig, setCropConfig] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 20,
    y: 20,
    width: 60,
    // height: 40,
    aspect: 3 / 4,
  });

  const [loading, setLoading] = useState(false);

  const [firstOpen, setFirstOpen] = useState(false);
  const handleFirstClose = () => setFirstOpen(false);
  const firstInputRef = useRef(null);
  const [madeFirstUrls, SetMadeFirstUrls] = useState(null);
  const [imageToFirstCrop, setImageToFirstCrop] = useState(undefined);
  const [croppedFirstImage, SetCroppedFirstImage] = useState(null);
  const [firstImage, setFirstImage] = useState(null);

  const [secondOpen, setSecondOpen] = useState(false);
  const handleSecondClose = () => setSecondOpen(false);
  const secondInputRef = useRef(null);
  const [madeSecondUrls, SetMadeSecondUrls] = useState(null);
  const [imageToSecondCrop, setImageToSecondCrop] = useState(undefined);
  const [croppedSecondImage, SetCroppedSecondImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);

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
    paddingBottom: '69px',
    textAlign: 'center',
  };

  const compressOption = {
    maxSizeMB: 600,
    maxWidthOrHeight: 500,
  };

  const resetErrors = () => {
    onSetIsFileTypeError(false);
    onSetIsNumberTypeError(false);
  };

  const firstFileClick = () => {
    firstInputRef.current.click();
  };

  const secondFileClick = () => {
    secondInputRef.current.click();
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
    setLoading(true);
    // s3の署名URLを作成
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          // 名前はファイルの名前のまま
          filename: file.name,
        },
      },
      accessToken
    );
    const compressFile = await imageCompression(file, compressOption);
    setLoading(false);

    SetMadeFirstUrls(imageUrls);
    const reader = new FileReader();
    // readAsDataURLでファイルを読み込むと発動
    reader.addEventListener('load', async () => {
      // ここでリサイズするための画像を圧縮してトリミングするためのイメージに格納
      setImageToFirstCrop(reader.result);
    });
    reader.readAsDataURL(compressFile);
    setFirstOpen(true);
    // console.log(imageUrls);
    event.target.value = '';
    // ここでリサイズする画像を格納
  };

  const secondFileUpload = async (event) => {
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
    setLoading(true);
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: file.name,
        },
      },
      accessToken
    );
    const compressFile = await imageCompression(file, compressOption);
    setLoading(false);
    SetMadeSecondUrls(imageUrls);
    const reader = new FileReader();

    // readAsDataURLでファイルを読み込むと発動
    reader.addEventListener('load', () => {
      // ここでリサイズする画像を格納
      setImageToSecondCrop(reader.result);
    });

    reader.readAsDataURL(compressFile);
    setSecondOpen(true);
    event.target.value = '';
    // ここでリサイズする画像を格納
  };

  const cropFirstImage = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        `CropImage.png` // destination filename
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedFirstImage(croppedImage);
    }
  };

  const cropSecondImage = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getCroppedImage(
        imageRef,
        crop,
        `CropImage.png` // destination filename
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedSecondImage(croppedImage);
    }
  };

  const registerFirstImage = async () => {
    setFirstImage(croppedFirstImage);
    onSetFirstImageFiles(croppedFirstImage);
    onSetFirstImageUrls(madeFirstUrls);
    handleFirstClose();
    setCropConfig({
      unit: 'px', // Can be 'px' or '%'
      x: 20,
      y: 20,
      width: 60,
      aspect: 3 / 4,
    });
  };

  const registerSecondImage = () => {
    setSecondImage(croppedSecondImage);
    onSetSecondImageFiles(croppedSecondImage);
    onSetSecondImageUrls(madeSecondUrls);
    handleSecondClose();
    setCropConfig({
      unit: 'px', // Can be 'px' or '%'
      x: 20,
      y: 20,
      width: 60,
      aspect: 3 / 4,
    });
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
        onSetResetImageFiles();
        onSetResetImageUrls();
        return;
      }
      modifyFiles.splice(imageIndex, 1);
      onSetModifyImageFiles(modifyFiles);
      const modifyImageUrls = s3ImageUrls.concat();
      modifyImageUrls.splice(imageIndex, 1);
      onSetModifyImageUrls(modifyImageUrls);
    }
  };

  const getCroppedImage = (sourceImage, cropConfig, fileName) => {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    const ctx = canvas.getContext('2d');
    canvas.width = cropConfig.width * pixelRatio * scaleX;
    canvas.height = cropConfig.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          // returning an error
          if (!blob) {
            reject(new Error('Canvas is empty'));
            return;
          }
          blob.name = fileName;
          resolve(blob);
        },
        'image/jpeg',
        1
      );
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
      <input
        ref={secondInputRef}
        type='file'
        accept='image/*'
        onChange={(event) => secondFileUpload(event)}
        hidden
      />
      <div className={form.images}>
        {firstImage !== null ? (
          <div style={{ position: 'relative' }}>
            {loading || (
              <button
                className={button.image_cancel_button}
                type='button'
                onClick={() => handleCancel(0)}
              >
                <DeleteForeverIcon />
              </button>
            )}
            <img
              src={window.URL.createObjectURL(firstImage)}
              alt={`あなたの写真 `}
              width='200'
              height='266.7'
              style={{ border: '4px solid #ff99c5' }}
            />
          </div>
        ) : (
          <SampleImageButton onClick={firstFileClick} />
        )}
        <br />
        <br />
        {secondImage !== null ? (
          <div style={{ position: 'relative' }}>
            {loading || (
              <button
                className={button.image_cancel_button}
                type='button'
                onClick={() => handleCancel(1)}
              >
                {loading || <DeleteForeverIcon />}
              </button>
            )}

            <img
              src={window.URL.createObjectURL(secondImage)}
              alt={`あなたの写真 `}
              width='200'
              height='266.7'
              style={{ border: '4px solid #ff99c5' }}
            />
          </div>
        ) : (
          <SampleImageButton onClick={secondFileClick} />
        )}
      </div>
      <Modal
        open={firstOpen}
        onClose={handleFirstClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={card.trimming_card}>
            <ReactCrop
              style={{}}
              src={imageToFirstCrop}
              crop={cropConfig}
              ruleOfThirds
              // 画像選択時
              onImageLoaded={(imageRef) => {
                // console.log('onImageLoaded');
                // <img ...>がimageRefに入る
                // imageRef.width = '300px';
                setImageRef(imageRef);
                // setCropConfig(cropConfig);
                // cropFirstImage(cropConfig);
              }}
              // リサイズ中(マウスを持っているとき)
              onChange={(cropConfig) => {
                // console.log('onChange');
                setCropConfig(cropConfig);
              }}
              // リサイズ後（マウス離したとき）
              onComplete={async (cropConfig) => {
                // console.log('onComplete');
                // console.log(cropConfig);
                cropFirstImage(cropConfig);
                // console.log(croppedFirstImage);
              }}
              crossorigin='anonymous' // to avoid CORS-related problems
            />
          </div>
          <button
            onClick={registerFirstImage}
            className={button.button_trimming}
          >
            トリミング
          </button>
        </Box>
      </Modal>
      <Modal
        open={secondOpen}
        onClose={handleSecondClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={card.trimming_card}>
            <ReactCrop
              src={imageToSecondCrop}
              crop={cropConfig}
              ruleOfThirds
              // 画像選択時
              onImageLoaded={(imageRef) => {
                // console.log(imageRef.class);
                // console.log(imageRef.width);
                // <img ...>がimageRefに入る
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
                cropSecondImage(cropConfig);
              }}
              crossorigin='anonymous' // to avoid CORS-related problems
            />
          </div>
          <button
            onClick={registerSecondImage}
            className={button.button_trimming}
          >
            トリミングする
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default TrimmingModal;
