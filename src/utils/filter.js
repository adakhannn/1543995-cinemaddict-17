import {FILTER_TYPE} from '../consts';

export const filter = {
  [FILTER_TYPE.ALL]: (films) => films.filter((film) => film),
  [FILTER_TYPE.WATCHLIST]: (films) => films.filter((film) => film.filmInfo.userDetails.watchList),
  [FILTER_TYPE.HISTORY]: (films) => films.filter((film) => film.filmInfo.userDetails.alreadyWatched),
  [FILTER_TYPE.FAVORITES]: (films) => films.filter((film) => film.filmInfo.userDetails.favorite),
};
