import {generateRandomInfo} from '../utils/common';
import {COMMENTS, PERSONS, DATES} from './mock-const';
import {EMOTIONS} from '../const';

export const generateCommentInfo = () => ({
  author: generateRandomInfo(PERSONS),
  comment: generateRandomInfo(COMMENTS),
  date: generateRandomInfo(DATES),
  emotion: generateRandomInfo(EMOTIONS),
});
