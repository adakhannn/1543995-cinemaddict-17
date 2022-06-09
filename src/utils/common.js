import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function generateRandomInfo (dates) {
  return dates[getRandomInteger(0, dates.length - 1)];
}

function getTimeFromMins(mins, hoursText, minutesText) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}${hoursText} ${minutes}${minutesText}`;
}

const humanizeDate = (date, format) => dayjs(date).format(format);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.keyCode === 13;

export {getRandomInteger, generateRandomInfo, humanizeDate, getTimeFromMins, isEscapeKey, isEnterKey};
