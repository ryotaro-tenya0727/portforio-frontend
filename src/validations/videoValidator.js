const validVideoType = (type) => {
  return type.match(/video.*/g);
};

const validVideoSize = (size) => {
  return size <= 54857600;
};

export { validVideoType, validVideoSize };
