import dayjs from 'dayjs';

const getWeightForNullData = (dataA, dataB) => {
  if (dataA === null && dataB === null) {
    return 0;
  }

  if (dataA === null) {
    return 1;
  }

  if (dataB === null) {
    return -1;
  }

  return null;
};

const sortFilmDate = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmB.filmInfo.release.date).diff(dayjs(filmA.filmInfo.release.date));
};

const sortFilmRating = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);

  return weight ?? filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;
};

const sortCommentsLength = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA.comments.length, filmB.comments.length);

  return weight ?? filmB.comments.length - filmA.comments.length;
};

export {sortFilmDate, sortFilmRating, sortCommentsLength};
