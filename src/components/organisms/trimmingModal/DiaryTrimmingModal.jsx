import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import { DiarySampleImageButton, Circular } from '../../atoms/atoms';
import { s3PresignedUrlRepository } from '../../../repositories/external/aws/s3/s3PresignedUrlRepository';
import { useAuth0 } from '@auth0/auth0-react';

import { useImageCrop } from '../../../hooks/usefulFunction/useImageCrop';

import form from './../../../css/templates/form.module.scss';
import button from './../../../css/atoms/button.module.scss';
import card from './../../../css/organisms/card.module.css';

const DiaryTrimmingModal = ({
  onSetIsFileTypeError,
  onSetIsNumberTypeError,
  onSetDiaryImageUrlAndIndex,
  diaryImageUrls,
  onSetDiaryImageUrls,
}) => {
  const { getAccessTokenSilently } = useAuth0();
  // 画像アップロード時にセット
  const [firstImageRef, setFirstImageRef] = useState();
  const [secondImageRef, setSecondImageRef] = useState();
  // リサイズ中に変化するリサイズ後のサイズ
  const [cropConfig, setCropConfig] = useState({
    unit: 'px', // Can be 'px' or '%'
    x: 20,
    y: 20,
    width: 60,
    // height: 40,
    aspect: 3 / 4,
  });
  const { getDiaryCroppedImage } = useImageCrop();

  const [firstLoading, setFirstLoading] = useState(false);
  const [secondLoading, setSecondLoading] = useState(false);

  const [firstOpen, setFirstOpen] = useState(false);
  const handleFirstClose = () => {
    setFirstOpen(false);
    setFirstImageToCrop(undefined);
    SetCroppedFirstImage(null);
  };
  const firstInputRef = useRef(null);
  const [firstImageToCrop, setFirstImageToCrop] = useState(undefined);
  const [croppedFirstImage, SetCroppedFirstImage] = useState(null);
  const [firstImage, setFirstImage] = useState(null);
  const [firstImageFileName, setFirstImageFileName] = useState(null);

  const [secondOpen, setSecondOpen] = useState(false);
  const handleSecondClose = () => {
    setSecondOpen(false);
    setSecondImageToCrop(undefined);
    SetCroppedSecondImage(null);
  };
  const secondInputRef = useRef(null);
  const [secondImageToCrop, setSecondImageToCrop] = useState(undefined);
  const [croppedSecondImage, SetCroppedSecondImage] = useState(null);
  const [secondImage, setSecondImage] = useState(null);
  const [secondImageFileName, setSecondImageFileName] = useState(null);

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
    paddingBottom: '69px',
    textAlign: 'center',
  };

  const compressOption = {
    maxSizeMB: 0.3,
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
  const openFirstDiaryTrimmingModal = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    const extension = file.name.match(/[^.]+$/)[0];
    setFirstImageFileName(`${crypto.randomUUID()}.${extension}`);
    resetErrors();
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
    ) {
      onSetIsFileTypeError(true);
      return;
    }

    const reader = new FileReader();
    // readAsDataURLでファイルを読み込むと発動
    reader.addEventListener('load', async () => {
      setFirstImageToCrop(reader.result);
    });
    reader.readAsDataURL(file);

    setFirstOpen(true);
    event.target.value = '';
  };

  const openSecondDiaryTrimmingModal = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    const extension = file.name.match(/[^.]+$/)[0];
    setSecondImageFileName(`${crypto.randomUUID()}.${extension}`);
    resetErrors();
    if (
      !['image/gif', 'image/jpeg', 'image/png', 'image/bmp'].includes(file.type)
    ) {
      onSetIsFileTypeError(true);
      return;
    }

    const reader = new FileReader();
    // readAsDataURLでファイルを読み込むと発動
    reader.addEventListener('load', async () => {
      setSecondImageToCrop(reader.result);
    });
    reader.readAsDataURL(file);

    setSecondOpen(true);
    event.target.value = '';
  };

  const cropFirstImage = async (crop) => {
    if (firstImageRef && crop.width && crop.height) {
      const croppedImage = await getDiaryCroppedImage(
        firstImageRef,
        crop,
        firstImageFileName // destination filename
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedFirstImage(croppedImage);
    }
  };

  const cropSecondImage = async (crop) => {
    if (secondImageRef && crop.width && crop.height) {
      const croppedImage = await getDiaryCroppedImage(
        secondImageRef,
        crop,
        secondImageFileName // destination filename
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedSecondImage(croppedImage);
    }
  };

  const registerFirstImage = async () => {
    handleFirstClose();
    setFirstImage(croppedFirstImage);
    setFirstLoading(true);
    const accessToken = await getAccessTokenSilently();
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: firstImageFileName,
        },
      },
      accessToken
    );
    onSetDiaryImageUrlAndIndex(imageUrls.diary_image_url, 0);
    if (
      !(croppedFirstImage instanceof Blob || croppedFirstImage instanceof File)
    ) {
      alert('保存に失敗しました。やり直してください。');
      return;
    }
    const compressFile = await imageCompression(
      croppedFirstImage,
      compressOption
    );

    await axios.put(imageUrls.presigned_url, compressFile, {
      headers: {
        'Content-Type': compressFile.type,
      },
    });
    setFirstLoading(false);

    setCropConfig({
      unit: 'px', // Can be 'px' or '%'
      x: 20,
      y: 20,
      width: 60,
      aspect: 3 / 4,
    });
  };

  const registerSecondImage = async () => {
    handleSecondClose();
    setSecondImage(croppedSecondImage);
    setSecondLoading(true);
    const accessToken = await getAccessTokenSilently();
    const imageUrls = await s3PresignedUrlRepository.getPresignedUrl(
      {
        presigned_url: {
          filename: secondImageFileName,
        },
      },
      accessToken
    );
    onSetDiaryImageUrlAndIndex(imageUrls.diary_image_url, 1);
    if (
      !(
        croppedSecondImage instanceof Blob || croppedSecondImage instanceof File
      )
    ) {
      alert('保存に失敗しました。やり直してください。');
      return;
    }
    const compressFile = await imageCompression(
      croppedSecondImage,
      compressOption
    );
    await axios.put(imageUrls.presigned_url, compressFile, {
      headers: {
        'Content-Type': compressFile.type,
      },
    });
    setSecondLoading(false);

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
      } else if (imageIndex === 1) {
        setSecondImage(null);
      }
      const filteredDiaryImageUrls = diaryImageUrls.filter((obj) => {
        return obj.diary_image_index !== imageIndex;
      });
      onSetDiaryImageUrls(filteredDiaryImageUrls);
    }
  };

  return (
    <div>
      <input
        ref={firstInputRef}
        type='file'
        accept='image/*'
        onChange={(event) => openFirstDiaryTrimmingModal(event)}
        hidden
      />
      <input
        ref={secondInputRef}
        type='file'
        accept='image/*'
        onChange={(event) => openSecondDiaryTrimmingModal(event)}
        hidden
      />
      <div className={form.imagesWrapper}>
        <div className={form.images}>
          {firstImage !== null ? (
            <div className={form.diaryPreviewImageFirst}>
              <button
                className={button.image_cancel_button}
                type='button'
                onClick={() => handleCancel(0)}
              >
                <DeleteForeverIcon />
              </button>
              {firstLoading && (
                <Circular
                  large={45}
                  small={45}
                  circleStyle={{
                    position: 'absolute',
                    top: '120px',
                    left: '85px',
                    zIndex: '1',
                  }}
                  color='#fff'
                />
              )}

              <img
                src={window.URL.createObjectURL(firstImage)}
                alt={`あなたの写真 `}
                width='200'
                height='266.7'
                class={form.imagePreview}
                style={
                  firstLoading
                    ? {
                        border: '4px solid #ff99c5',
                        filter: 'brightness(50%)',
                      }
                    : {
                        border: '4px solid #ff99c5',
                      }
                }
              ></img>
            </div>
          ) : (
            <DiarySampleImageButton onClick={firstFileClick} />
          )}

          {secondImage !== null ? (
            <div
              style={{
                position: 'relative',
              }}
            >
              <button
                className={button.image_cancel_button}
                type='button'
                onClick={() => handleCancel(1)}
              >
                <DeleteForeverIcon />
              </button>
              {secondLoading && (
                <Circular
                  large={45}
                  small={45}
                  circleStyle={{
                    position: 'absolute',
                    top: '120px',
                    left: '85px',
                    zIndex: '1',
                  }}
                  color='#fff'
                />
              )}

              <img
                src={window.URL.createObjectURL(secondImage)}
                alt={`あなたの写真 `}
                width='200'
                height='266.7'
                class={form.imagePreview}
                style={
                  secondLoading
                    ? {
                        border: '4px solid #ff99c5',
                        filter: 'brightness(50%)',
                      }
                    : {
                        border: '4px solid #ff99c5',
                      }
                }
              ></img>
            </div>
          ) : (
            <DiarySampleImageButton onClick={secondFileClick} />
          )}
        </div>
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
              src={firstImageToCrop}
              crop={cropConfig}
              ruleOfThirds
              onImageLoaded={(imageRef) => {
                // console.log('onImageLoaded');
                // <img ...>がimageRefに入る
                // imageRef.width = '300px';
                // src={FirstimageToCrop}で画像が読み込まれたらこの関数が実行される。
                setFirstImageRef(imageRef);
                resetErrors();
              }}
              // リサイズ中(マウスを持っているとき)
              onChange={(cropConfig) => {
                // console.log('onChange');
                setCropConfig(cropConfig);
              }}
              // リサイズ後（マウス離したとき）
              onComplete={async (cropConfig) => {
                cropFirstImage(cropConfig);
              }}
              crossorigin='anonymous' // to avoid CORS-related problems
            />
          </div>
          <button
            onClick={registerFirstImage}
            className={button.buttonTrimming}
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
              style={{}}
              src={secondImageToCrop}
              crop={cropConfig}
              ruleOfThirds
              onImageLoaded={(imageRef) => {
                setSecondImageRef(imageRef);
              }}
              onChange={(cropConfig) => {
                setCropConfig(cropConfig);
              }}
              onComplete={async (cropConfig) => {
                cropSecondImage(cropConfig);
              }}
              crossorigin='anonymous'
            />
          </div>
          <button
            onClick={registerSecondImage}
            className={button.buttonTrimming}
          >
            トリミング
          </button>
        </Box>
      </Modal>
    </div>
  );
};

export default DiaryTrimmingModal;
