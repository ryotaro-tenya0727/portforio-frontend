import PhotoIcon from '@mui/icons-material/Photo';

import button from './../../../css/atoms/button.module.scss';

const DiarySampleVideoButton = () => {
  return (
    <button
      className={button.diarySampleButtonVideo}
      // onClick={onClick}
      type='button'
    >
      <p className={button.diarySampleButtonVideoText}>
        <PhotoIcon
          sx={{ fontSize: '22px', mb: '-6px', mr: '8px', color: '#ff66d1' }}
        />
        動画をアップロード
      </p>
    </button>
  );
};

export default DiarySampleVideoButton;
