import diary from './../../css/templates/diary.module.css';
const StreamingVideo = ({ videoUid, height, width }) => {
  return (
    <div className={diary.streamingVideoWrapper}>
      <div className={diary.streamingVideo}>
        <iframe
          title='diary-video'
          src={`${process.env.REACT_APP_CLOUDFLARE_CUSTOMER_SUBDOMAIN}/${videoUid}/iframe`}
          style={{ border: 'none' }}
          height={height}
          width={width}
          allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
          allowfullscreen='true'
        ></iframe>
      </div>
    </div>
  );
};

export default StreamingVideo;
