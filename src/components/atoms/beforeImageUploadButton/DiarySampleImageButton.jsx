import PhotoIcon from '@mui/icons-material/Photo';

import button from './../../../css/atoms/button.module.scss';

const DiarySampleImageButton = ({ onClick }) => {
  return (
    <button
      style={{ marginTop: '25px' }}
      className={button.diary_sample_button_image}
      onClick={onClick}
      type='button'
    >
      <p className={button.diary_sample_button_image_text}>
        <PhotoIcon
          sx={{ fontSize: '22px', mb: '-6px', mr: '8px', color: '#ff66d1' }}
        />
        画像を設定する
      </p>
    </button>
  );
};

export default DiarySampleImageButton;
