import { useState, useRef } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ReactCrop from 'react-image-crop';
import imageCompression from 'browser-image-compression';
import 'react-image-crop/dist/ReactCrop.css';
import axios from 'axios';

import { ProfileSampleImageButton, Circular } from '../../atoms/atoms';
import { s3PresignedUrlRepository } from '../../../repositories/s3PresignedUrlRepository';
import { useAuth0 } from '@auth0/auth0-react';

import { useImageCrop } from '../../../hooks/usefulFunction/useImageCrop';

import button from './../../../css/atoms/button.module.scss';
import card from './../../../css/organisms/card.module.css';

const ProfileTrimmingModal = ({
  onSetDiaryImageUrl,
  onSetIsFileTypeError,
  onSetIsNumberTypeError,
}) => {
  const { getAccessTokenSilently } = useAuth0(); // 画像アップロード時にセット
  const [imageRef, setImageRef] = useState();
  const resetErrors = () => {
    onSetIsFileTypeError(false);
    onSetIsNumberTypeError(false);
  };
  const compressOption = {
    maxSizeMB: 0.3,
    maxWidthOrHeight: 500,
  };
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
  const [Loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const handleModalClose = () => setModalOpen(false);
  const inputRef = useRef(null);
  const [imageToCrop, setImageToCrop] = useState(undefined);
  const [croppedImage, SetCroppedImage] = useState(null);
  const [Image, setImage] = useState(null);
  const [imageFileName, setImageFileName] = useState(null);

  const openTrimmingModal = async (event) => {
    if (!event) return;
    const file = event.target.files[0];
    if (!file) return;
    const extension = file.name.match(/[^.]+$/)[0];
    setImageFileName(`${crypto.randomUUID()}.${extension}`);
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
      setImageToCrop(reader.result);
    });
    reader.readAsDataURL(file);

    setModalOpen(true);
    event.target.value = '';
  };

  const handleCancel = () => {
    if (window.confirm('選択した画像を消してよろしいですか？')) {
      resetErrors();
      setImage(null);
    }
  };

  const FileClick = () => {
    inputRef.current.click();
  };

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

  const cropImage = async (crop) => {
    if (imageRef && crop.width && crop.height) {
      const croppedImage = await getDiaryCroppedImage(
        imageRef,
        crop,
        imageFileName
      );
      // リサイズ後に表示する画像をstateに格納
      SetCroppedImage(croppedImage);
    }
  };

  const registerImage = async () => {
    handleModalClose();
    setImage(croppedImage);
    setLoading(true);
    const accessToken = await getAccessTokenSilently();
    const imageUrls =
      await s3PresignedUrlRepository.getProfileImagePresignedUrl(
        {
          presigned_url: {
            filename: imageFileName,
          },
        },
        accessToken
      );
    const compressFile = await imageCompression(croppedImage, compressOption);

    await axios.put(imageUrls.presigned_url, compressFile, {
      headers: {
        'Content-Type': 'image/*',
      },
    });
    onSetDiaryImageUrl(imageUrls.diary_image_url);
    setLoading(false);

    setCropConfig({
      unit: 'px', // Can be 'px' or '%'
      x: 20,
      y: 20,
      width: 60,
      aspect: 3 / 4,
    });
  };

  return (
    <div>
      <div>
        <input
          ref={inputRef}
          type='file'
          accept='image/*'
          onChange={(event) => openTrimmingModal(event)}
          hidden
        />
        {Image !== null ? (
          <div>
            {Loading && (
              <Circular
                large={45}
                small={45}
                circleStyle={{
                  position: 'absolute',
                  top: '0px',
                  left: '0px',
                  zIndex: '1',
                }}
                color='#fff'
              />
            )}

            <img
              src={window.URL.createObjectURL(Image)}
              alt={`あなたの写真 `}
              width='80'
              height='80'
              style={
                Loading
                  ? {
                      border: '4px solid #ff99c5',
                      borderRadius: '50%',
                      filter: 'brightness(50%)',
                    }
                  : {
                      borderRadius: '50%',
                      border: '4px solid #ff99c5',
                    }
              }
            ></img>
            <button
              className={button.profile_image_cancel_button}
              type='button'
              onClick={() => handleCancel()}
            >
              <DeleteForeverIcon
                sx={{ fontSize: '20px', mb: '-4px', ml: '-1px' }}
              />
            </button>
          </div>
        ) : (
          <>
            <ProfileSampleImageButton onClick={FileClick} />
            <span style={{ fontWeight: 'bold' }}>
              <ArrowBackIcon
                sx={{ fontSize: '22px', mb: '-4px', ml: '8px', mr: '5px' }}
              />
              クリック
            </span>
          </>
        )}
      </div>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        <Box sx={style}>
          <div className={card.trimming_card}>
            <ReactCrop
              style={{}}
              src={imageToCrop}
              crop={cropConfig}
              ruleOfThirds
              onImageLoaded={(imageRef) => {
                // console.log('onImageLoaded');
                // <img ...>がimageRefに入る
                // imageRef.width = '300px';
                // src={FirstimageToCrop}で画像が読み込まれたらこの関数が実行される。
                setImageRef(imageRef);
              }}
              // リサイズ中(マウスを持っているとき)
              onChange={(cropConfig) => {
                // console.log('onChange');
                setCropConfig(cropConfig);
              }}
              // リサイズ後（マウス離したとき）
              onComplete={async (cropConfig) => {
                cropImage(cropConfig);
              }}
              crossorigin='anonymous' // to avoid CORS-related problems
            />
          </div>
          <button onClick={registerImage} className={button.button_trimming}>
            トリミング
          </button>
        </Box>
      </Modal>
    </div>
  );
};
export default ProfileTrimmingModal;
