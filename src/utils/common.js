import dayjs from 'dayjs';

function getTimeFromMins(mins, hoursText, minutesText) {
  const hours = Math.trunc(mins/60);
  const minutes = mins % 60;
  return `${hours}${hoursText} ${minutes}${minutesText}`;
}

const humanizeDate = (date, format) => dayjs(date).format(format);

const isEscapeKey = (evt) => evt.key === 'Escape';

const isEnterKey = (evt) => evt.keyCode === 13;

const textTruncate = function(str, length, ending = '...') {
  if (str.length > length) {
    return str.substring(0, length - ending.length) + ending;
  }
  return str;
};

export {humanizeDate, getTimeFromMins, isEscapeKey, isEnterKey, textTruncate};
