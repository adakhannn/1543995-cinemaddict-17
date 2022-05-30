import {generateRandomInfo} from '../utils/common';
import {COMMENTS, PERSONS, DATES} from './mock-consts';
import {EMOTIONS} from '../consts';

export const generateCommentInfo = () => ({
  author: generateRandomInfo(PERSONS),
  comment: generateRandomInfo(COMMENTS),
  date: generateRandomInfo(DATES),
  emotion: generateRandomInfo(EMOTIONS),
});
