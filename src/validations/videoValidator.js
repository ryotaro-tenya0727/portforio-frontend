const validVideoType = (type) => {
  return type.match(/video.*/g);
};

export { validVideoType };
