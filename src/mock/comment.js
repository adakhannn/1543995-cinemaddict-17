import {generateRandomInfo} from '../utils';
import {EMOTIONS, comments, persons, dates} from '../const';

export const generateCommentInfo = () => ({
  author: generateRandomInfo(persons),
  comment: generateRandomInfo(comments),
  date: generateRandomInfo(dates),
  emotion: generateRandomInfo(EMOTIONS),
});
