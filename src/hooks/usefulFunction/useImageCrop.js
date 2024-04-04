export const useImageCrop = () => {
  const getDiaryCroppedImage = (sourceImage, cropConfig, fileName) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    const ctx = canvas.getContext('2d');
    canvas.width = cropConfig.width * pixelRatio * scaleX;
    canvas.height = cropConfig.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    // drawImageの参考 https://developer.mozilla.org/ja/docs/Web/API/CanvasRenderin
    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY,
      0,
      0,
      cropConfig.width * scaleX,
      cropConfig.height * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return;
          }
          blob.name = fileName;
          resolve(blob);
        },
        `image/${fileName.match(/[^.]+$/)[0]}`,
        1
      );
    });
  };

  const getCroppedCircleImage = (sourceImage, cropConfig, fileName) => {
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    const ctx = canvas.getContext('2d');

    canvas.width = cropConfig.diameter * pixelRatio * scaleX;
    canvas.height = cropConfig.diameter * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

    ctx.beginPath();
    ctx.arc(
      canvas.width / 2 / pixelRatio,
      canvas.height / 2 / pixelRatio,
      (cropConfig.diameter * scaleX) / 2,
      0,
      2 * Math.PI
    );
    ctx.clip();

    ctx.drawImage(
      sourceImage,
      cropConfig.x * scaleX,
      cropConfig.y * scaleY,
      cropConfig.diameter * scaleX,
      cropConfig.diameter * scaleY,
      0,
      0,
      cropConfig.diameter * scaleX,
      cropConfig.diameter * scaleY
    );

    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            return;
          }
          blob.name = fileName;
          resolve(blob);
        },
        'image/jpeg',
        1
      );
    });
  };

  return { getDiaryCroppedImage, getCroppedCircleImage };
};
