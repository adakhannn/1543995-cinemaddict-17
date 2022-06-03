import {generateComment} from './comments';
import {getRandomInteger,getRandomFloat, generateRandomInfo} from '../utils/common';
import {
  TITLES,
  ALTERNATIVE_TITLES,
  AGE_RATING,
  PERSONS,
  DATES,
  COUNTRIES,
  GENRES,
  DESCRIPTIONS
} from './mock-consts';
import {nanoid} from 'nanoid';

const generateComments = () => Array.from({length: getRandomInteger(0, 100)}, generateComment);
const generateRandomPerson = () => generateRandomInfo(PERSONS);
const generateRandomGenre = () => generateRandomInfo(GENRES);
const generateRandomTitle = () => generateRandomInfo(TITLES);

export const generateFilm = () => ({
  id: nanoid(),
  comments: generateComments(),
  filmInfo: {
    title: generateRandomTitle(),
    alternativeTitle: generateRandomInfo(ALTERNATIVE_TITLES),
    totalRating: getRandomFloat(0, 10, 1),
    poster: generateRandomTitle().split(' ').join('-').split('(').join('').split(')').join(''),
    ageRating: generateRandomInfo(AGE_RATING),
    director: generateRandomInfo(PERSONS),
    writers: Array.from({length: getRandomInteger(1, 10)}, generateRandomPerson),
    actors: Array.from({length: getRandomInteger(1, 10)}, generateRandomPerson),
    release: {
      date: generateRandomInfo(DATES),
      releaseCountry: generateRandomInfo(COUNTRIES),
    },
    runtime: getRandomInteger(1, 180),
    genres: Array.from({length: getRandomInteger(1, 4)}, generateRandomGenre),
    description: generateRandomInfo(DESCRIPTIONS),
    userDetails: {
      watchList: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateRandomInfo(DATES),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  },
});
