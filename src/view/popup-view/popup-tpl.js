import {getTimeFromMins, humanizeDate} from '../../utils/common';
import {EMOTIONS} from '../../consts';

export const popupTemplate = (film) => {
  const {comments, filmInfo, checkedEmoji} = film;
  const getGenresHtml = () => {
    const genresHtml = [];
    filmInfo.genres.forEach((item) => {
      genresHtml.push(`<span class="film-details__genre">${item}</span>`);
    });
    return genresHtml;
  };
  const getEmotionsHtml = () => {
    const EmotionsHtml = [];
    EMOTIONS.forEach((item) => {
      EmotionsHtml.push(
        `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${item}" value="${item}" ${checkedEmoji === item ? 'checked' : ''}>
          <label class="film-details__emoji-label" for="emoji-${item}">
            <img src="./images/emoji/${item}.png" width="30" height="30" alt="emoji">
          </label>`
      );
    });
    return EmotionsHtml;
  };
  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="./images/posters/${filmInfo.poster}.jpg" alt="${filmInfo.title}">

              <p class="film-details__age">${filmInfo.ageRating}</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${filmInfo.title}</h3>
                  <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${filmInfo.totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${filmInfo.director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${filmInfo.writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${filmInfo.actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeDate(filmInfo.release.date, 'DD MMMM YYYY')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${getTimeFromMins(filmInfo.runtime, 'h', 'm')}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    ${getGenresHtml().join('')}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">${filmInfo.description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${filmInfo.userDetails.watchList ? '' : 'film-details__control-button--active'}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${filmInfo.userDetails.alreadyWatched ? '' : 'film-details__control-button--active'}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${filmInfo.userDetails.favorite ? '' : 'film-details__control-button--active'}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>

        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

            <ul class="film-details__comments-list"></ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">${checkedEmoji ? `<img src="./images/emoji/${checkedEmoji}.png" width="70" height="70" alt="${checkedEmoji}">` : ''}</div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${getEmotionsHtml().join('')}
              </div>
            </div>
          </section>
        </div>
      </form>
   </section>`
  );
};
