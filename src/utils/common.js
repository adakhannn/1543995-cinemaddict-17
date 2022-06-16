import dayjs from 'dayjs';

function getTimeFromMins(mins, hoursText, minutesText) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}${hoursText} ${minutes}${minutesText}`;
}

const humanizeDate = (date, format) => dayjs(date).format(format);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.keyCode === 13;

export {humanizeDate, getTimeFromMins, isEscapeKey, isEnterKey};
