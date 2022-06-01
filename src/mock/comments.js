import {generateRandomInfo} from '../utils/common';
import {COMMENTS, PERSONS, DATES} from './mock-consts';
import {EMOTIONS} from '../consts';
import {nanoid} from 'nanoid';

export const generateComment = () => ({
  id: nanoid(),
  author: generateRandomInfo(PERSONS),
  comment: generateRandomInfo(COMMENTS),
  date: generateRandomInfo(DATES),
  emotion: generateRandomInfo(EMOTIONS),
});
