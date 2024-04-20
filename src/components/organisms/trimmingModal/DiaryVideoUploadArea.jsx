import { useState, useRef } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';

import { s3PresignedUrlRepository } from '../../../repositories/external/aws/s3/s3PresignedUrlRepository';
import { videoConvertStreamingRepository } from '../../../repositories/external/cloudflare/stream/videoConvertStreamingRepository';

import { DiarySampleVideoButton, Circular } from '../../atoms/atoms';

import form from './../../../css/templates/form.module.scss';
import button from './../../../css/atoms/button.module.scss';

import {
  validVideoType,
  validVideoSize,
} from './../../../validations/videoValidator';

const DiaryVideoUploadArea = ({ onSetDiaryVideoInformations }) => {
  const videoRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [videoUid, setVideoUid] = useState(null);
  const [videoThumnnailUrl, setvideoThumnnailUrl] = useState(null);
  const { getAccessTokenSilently } = useAuth0();

  const videoRefClick = () => {
    videoRef.current.click();
  };

  const onVideoSelected = async (e) => {
    setIsUploading(true);
    const selectedFile = e.target.files[0];
    console.log(validVideoType(selectedFile.type));
    const extension = selectedFile.name.match(/[^.]+$/)[0];
    if (!validVideoType(selectedFile.type)) {
      alert('動画ファイル以外はアップロードできません');
      setIsUploading(false);
      return;
    }
    if (!validVideoSize(selectedFile.size)) {
      alert('50MBを超える動画ファイルはアップロードできません');
      setIsUploading(false);
      return;
    }

    const accessToken = await getAccessTokenSilently();

    const imageUrls = await s3PresignedUrlRepository.getDiaryVideoPresignedUrl(
      {
        presigned_url: {
          filename: `${crypto.randomUUID()}.${extension}`,
        },
      },
      accessToken
    );

    await axios.put(imageUrls.presigned_url, selectedFile, {
      headers: {
        'Content-Type': 'video/*',
      },
    });

    const response = await videoConvertStreamingRepository.createStreamingVideo(
      { video_upload: { url: imageUrls.diary_video_url } },
      accessToken
    );
    onSetDiaryVideoInformations({
      thumbnail_url: response.thumbnail_url,
      video_uid: response.video_uid,
    });
    setvideoThumnnailUrl(response.thumbnail_url);
    setVideoUid(response.video_uid);
    setIsUploading(false);
  };

  return (
    <>
      {(() => {
        if (isUploading) {
          return <Circular large={64} small={64} top={128} bottom={128} />;
        } else if (!!videoThumnnailUrl && !!videoUid) {
          console.log(videoUid);
          return (
            <iframe
              title='diary-video'
              src={`${process.env.REACT_APP_CLOUDFLARE_CUSTOMER_SUBDOMAIN}/${videoUid}/iframe`}
              style={{ border: 'none' }}
              height='300'
              width='600'
              allow='accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;'
              allowfullscreen='true'
            ></iframe>
          );
        } else {
          return (
            <div class={form.uploadVideo}>
              <input
                ref={videoRef}
                type='file'
                accept='video/*'
                onChange={(event) => onVideoSelected(event)}
                hidden
              />
              <DiarySampleVideoButton onClick={videoRefClick} />
            </div>
          );
        }
      })()}
    </>
  );
};

export default DiaryVideoUploadArea;
