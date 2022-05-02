import {generateCommentInfo} from './comment';
import {getRandomInteger,getRandomFloat, generateRandomInfo} from '../utils';
import {
  titles,
  alternativeTitles,
  ageRating,
  persons,
  dates,
  countries,
  genres,
  descriptions
} from '../const';

const generateComments = () => Array.from({length: getRandomInteger(0, 100)}, generateCommentInfo);
const generateRandomPerson = () => generateRandomInfo(persons);
const generateRandomGenre = () => generateRandomInfo(genres);
const generateRandomTitle = () => generateRandomInfo(titles);

export const generateFilm = () => ({
  comments: generateComments(),
  filmInfo: {
    title: generateRandomTitle(),
    alternativeTitle: generateRandomInfo(alternativeTitles),
    totalRating: getRandomFloat(0, 10, 1),
    poster: generateRandomTitle().split(' ').join('-').split('(').join('').split(')').join(''),
    ageRating: generateRandomInfo(ageRating),
    director: generateRandomInfo(persons),
    writers: Array.from({length: getRandomInteger(1, 10)}, generateRandomPerson),
    actors: Array.from({length: getRandomInteger(1, 10)}, generateRandomPerson),
    release: {
      date: generateRandomInfo(dates),
      releaseCountry: generateRandomInfo(countries),
    },
    runtime: getRandomInteger(1, 180),
    genres: Array.from({length: getRandomInteger(1, 4)}, generateRandomGenre),
    description: generateRandomInfo(descriptions),
    userDetails: {
      watchList: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: generateRandomInfo(dates),
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  },
});
