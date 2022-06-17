import PhotoIcon from '@mui/icons-material/Photo';

import button from './../../css/atoms/button.module.css';
const SampleImageButton = ({ onClick }) => {
  return (
    <button className={button.sample_image} onClick={onClick}>
      <p className={button.sample_image_text}>
        <PhotoIcon
          sx={{ fontSize: '22px', mb: '-6px', mr: '8px', color: '#ff66d1' }}
        />
        画像を設定する
      </p>
    </button>
  );
};

export default SampleImageButton;
