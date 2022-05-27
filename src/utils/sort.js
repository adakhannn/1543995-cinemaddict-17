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

const sortFilmDateUp = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA.filmInfo.release.date, filmB.filmInfo.release.date);

  return weight ?? dayjs(filmA.filmInfo.release.date).diff(dayjs(filmB.filmInfo.release.date));
};

const sortFilmRatingUp = (filmA, filmB) => {
  const weight = getWeightForNullData(filmA.filmInfo.totalRating, filmB.filmInfo.totalRating);

  return weight ?? filmA.filmInfo.totalRating - filmB.filmInfo.totalRating;
};

export {sortFilmDateUp, sortFilmRatingUp};
