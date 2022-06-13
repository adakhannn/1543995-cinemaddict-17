export const filmControlsTemplate = (film) => {
  const {filmInfo} = film;
  return (
    `<section class="film-details__controls">
      <button type="button" class="film-details__control-button film-details__control-button--watchlist ${filmInfo.userDetails.watchList ? 'film-details__control-button--active' : ''}" id="watchlist" name="watchlist">Add to watchlist</button>
      <button type="button" class="film-details__control-button film-details__control-button--watched ${filmInfo.userDetails.alreadyWatched ? 'film-details__control-button--active' : ''}" id="watched" name="watched">Already watched</button>
      <button type="button" class="film-details__control-button film-details__control-button--favorite ${filmInfo.userDetails.favorite ? 'film-details__control-button--active' : ''}" id="favorite" name="favorite">Add to favorites</button>
    </section>`
  );
};
