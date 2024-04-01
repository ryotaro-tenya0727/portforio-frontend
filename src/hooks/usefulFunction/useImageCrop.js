export const useImageCrop = () => {
  // 画像をトリミングする関数
  const getCroppedImage = (sourceImage, cropConfig, fileName) => {
    // creating the cropped image from the source image
    const canvas = document.createElement('canvas');
    const pixelRatio = window.devicePixelRatio;
    const scaleX = sourceImage.naturalWidth / sourceImage.width;
    const scaleY = sourceImage.naturalHeight / sourceImage.height;
    const ctx = canvas.getContext('2d');
    canvas.width = cropConfig.width * pixelRatio * scaleX;
    canvas.height = cropConfig.height * pixelRatio * scaleY;

    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    ctx.imageSmoothingQuality = 'high';

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
          // returning an error
          if (!blob) {
            reject(new Error('Canvas is empty'));
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

  return { getCroppedImage };
};
