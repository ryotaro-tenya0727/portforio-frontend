import PhotoIcon from '@mui/icons-material/Photo';

import button from './../../css/atoms/button.module.scss';

const SampleImageButton = ({ onClick }) => {
  return (
    <button
      style={{ marginTop: '25px' }}
      className={button.sample_image}
      onClick={onClick}
      type='button'
    >
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
