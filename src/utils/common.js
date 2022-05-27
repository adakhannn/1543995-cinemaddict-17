import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

function getRandomFloat (a, b, digits = 1) {
  const lower = Math.min(Math.abs(a), Math.abs(b));
  const upper = Math.max(Math.abs(a), Math.abs(b));
  const result = Math.random() * (upper - lower) + lower;
  return result.toFixed(digits);
}

function generateRandomInfo (dates) {
  return dates[getRandomInteger(0, dates.length - 1)];
}

function getTimeFromMins(mins, hoursText, minutesText) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}${hoursText} ${minutes}${minutesText}`;
}

const updateItem = (items, update) => {
  const index = items.findIndex((item) => item.id === update.id);

  if (index === -1) {
    return items;
  }

  return [
    ...items.slice(0, index),
    update,
    ...items.slice(index + 1),
  ];
};

const humanizeDate = (date, format) => dayjs(date).format(format);

const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomInteger, getRandomFloat, generateRandomInfo, humanizeDate, getTimeFromMins, isEscapeKey, updateItem};