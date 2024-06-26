import PhotoIcon from '@mui/icons-material/Photo';

import button from './../../../css/atoms/button.module.scss';

const DiarySampleImageButton = ({ onClick }) => {
  return (
    <button
      className={button.diarySampleButtonImage}
      onClick={onClick}
      type='button'
    >
      <p className={button.diarySampleButtonImageText}>
        <PhotoIcon
          sx={{ fontSize: '22px', mb: '-6px', mr: '8px', color: '#ff66d1' }}
        />
        画像を設定する
      </p>
    </button>
  );
};

export default DiarySampleImageButton;
