import { DiarySampleVideoButton } from '../../atoms/atoms';

import form from './../../../css/templates/form.module.scss';
import button from './../../../css/atoms/button.module.scss';

const DiaryVideoUploadArea = ({ onClick }) => {
  return (
    <>
      <div class={form.uploadVideo}>
        <DiarySampleVideoButton />
      </div>
    </>
  );
};

export default DiaryVideoUploadArea;
