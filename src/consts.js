const FILM_COUNT_PER_STEP = 5;

const FILTER_TYPE = {
  ALL: 'All',
  WATCHLIST: 'Watchlist',
  HISTORY: 'History',
  FAVORITES: 'Favorites',
};

const SORT_TYPE = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

const EMOTIONS = [
  'smile',
  'sleeping',
  'puke',
  'angry',
];

const USER_ACTION = {
  UPDATE: 'UPDATE',
  ADD: 'ADD',
  DELETE: 'DELETE',
};

const FILM_UPDATE_TYPE = {
  PATCH: 'PATCH',
  MAJOR: 'MAJOR',
  INIT:  'INIT',
};

const COMMENT_UPDATE_TYPE = {
  DELETE: 'DELETE',
  ADD:    'ADD',
  INIT:   'INIT',
};

const NO_FILMS_TEXTS = {
  [FILTER_TYPE.ALL]: 'There are no movies in our database',
  [FILTER_TYPE.WATCHLIST]: 'There are no watchlist movies now',
  [FILTER_TYPE.HISTORY]: 'There are no history movies now',
  [FILTER_TYPE.FAVORITES]: 'There are no favorites movies now',
};

export {FILM_COUNT_PER_STEP, FILTER_TYPE, EMOTIONS, SORT_TYPE, FILM_UPDATE_TYPE, USER_ACTION, NO_FILMS_TEXTS, COMMENT_UPDATE_TYPE};
