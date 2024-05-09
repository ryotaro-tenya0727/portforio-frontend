import diary from './../../css/templates/diary.module.css';
const StreamingVideo = ({ videoUid, width }) => {
  return (
    <div className={diary.streamingVideoWrapper}>
      <div className={diary.streamingVideo}>
        <iframe
          title='diary-video'
          src={`${process.env.REACT_APP_CLOUDFLARE_CUSTOMER_SUBDOMAIN}/${videoUid}/iframe`}
          style={{
            border: 'none',
            width: '100%',
            maxWidth: width,
            height: '300px',
          }}
          allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
          allowfullscreen='true'
        ></iframe>
      </div>
    </div>
  );
};

export default StreamingVideo;
