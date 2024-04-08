import AddAPhotoIcon from '@mui/icons-material/AddAPhoto';
import button from './../../../css/atoms/button.module.scss';

const ProfileSampleImageButton = ({ onClick }) => {
  return (
    <button
      className={button.profile_sample_button_image}
      onClick={onClick}
      type='button'
    >
      <p className={button.profile_sample_button_image_text}>
        <AddAPhotoIcon
          sx={{ fontSize: '22px', color: '#fff', mt: '10px', opacity: 0.8 }}
        />
      </p>
    </button>
  );
};

export default ProfileSampleImageButton;
