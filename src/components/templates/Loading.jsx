import { memo } from 'react';

import loading from './../../css/templates/loading.module.css';

const Loading = memo(() => {
  const imageDomain = process.env.REACT_APP_IMAGE_DOMAIN;
  return (
    <div
      style={{
        textAlign: 'center',
      }}
    >
      <img
        src={`${imageDomain}/admin/loading-image-min.png`}
        alt='picture'
        className={loading.loading_image}
      />
    </div>
  );
});

export default Loading;
