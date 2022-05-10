import {getTimeFromMins, humanizeDate} from '../../utils';

export const cardTemplate = (film) => {
  const {comments, filmInfo} = film;
  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${filmInfo.title}</h3>
        <p class="film-card__rating">${filmInfo.totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizeDate(filmInfo.release.date, 'YYYY')}</span>
          <span class="film-card__duration">${getTimeFromMins(filmInfo.runtime, 'h', 'm')}</span>
          <span class="film-card__genre">${filmInfo.genres.join(' ')}</span>
        </p>
        <img src="./images/posters/${filmInfo.poster}.jpg" alt="${filmInfo.title}" class="film-card__poster">
        <p class="film-card__description">${filmInfo.description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${filmInfo.userDetails.watchList ? '' : 'film-card__controls-item--active'}" type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${filmInfo.userDetails.alreadyWatched ? '' : 'film-card__controls-item--active'}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${filmInfo.userDetails.favorite ? '' : 'film-card__controls-item--active'}" type="button">Mark as favorite</button>
      </div>
   </article>`
  );
};
