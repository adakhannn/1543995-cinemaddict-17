import {generateRandomInfo} from '../utils';
import {EMOTIONS, COMMENTS, PERSONS, DATES} from './mock-const';

export const generateCommentInfo = () => ({
  author: generateRandomInfo(PERSONS),
  comment: generateRandomInfo(COMMENTS),
  date: generateRandomInfo(DATES),
  emotion: generateRandomInfo(EMOTIONS),
});
